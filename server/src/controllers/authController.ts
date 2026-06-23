import UserModel from "../models/User";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

function generateToken(user: any) {
    return jwt.sign({
        role: user.role,
        id: user.id,
        email: user.email,
    },
    process.env.SECRET || 'fallback_secret',
    {
        expiresIn: "1h"
    });
} 

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "user is Exist" });
            return;
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name, email, password: hashpassword
        });
        await newUser.save();
        res.status(201).json({ message: "user registed" });
    } catch (error: any) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "error", error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "invalid email or password" });
            return;
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            const token = generateToken(user);
            res.status(200).json({
                message: "login successful",
                token,
                role: user.role,
                id: user.id,
                emailAddress: user.email,
            });
        } else {
            res.status(400).json({ message: "invalid email or password" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            valid: true,
            user: (req as any).user
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const githubCallback = async (req: Request, res: Response) => {
    try {
        const { code, state } = req.query;

        if (!code || !state) {
            res.status(400).json({ message: "Authorization code or User ID missing" });
            return;
        }


        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code
            },
            { headers: { Accept: 'application/json' } }
        );

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) throw new Error("Failed to get token");


        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` }
        });

        const githubUsername = userResponse.data.login;


        const user = await UserModel.findById(state);
        
        if (!user) {
            res.status(404).json({ message: "User not found in our database" });
            return;
        }


        user.githubAccessToken = accessToken;
        user.githubUsername = githubUsername;
        await user.save();

   
        res.redirect('http://localhost:5173/dashboard');

    } catch (error: any) {
        console.error("GitHub OAuth Error:", error);
        res.status(500).json({ message: "OAuth Failed", error: error.message });
    }
};

export const getGithubStatus = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const user = await UserModel.findById(userId);

        if (!user || !user.githubAccessToken) {
            res.status(400).json({
                success: false,
                message: 'Please connect your GitHub account first.'
            });
            return; 
        }

        const token = user.githubAccessToken;
        const username = user.githubUsername;

        const headers = {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'DevPulse-App'
        };

        const [userResponse, reposResponse] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`, { headers }),
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
        ]);
        
        const totalRepos = userResponse.data.public_repos;
        const totalStars = reposResponse.data.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const languages = reposResponse.data.map((repo: any) => repo.language).filter(Boolean);
        
        const langCounts: Record<string, number> = {};
        languages.forEach((lang: string) => { langCounts[lang] = (langCounts[lang] || 0) + 1; });

        res.json({
            success: true,
            githubUsername: username,
            stats: {
                activeProjects: totalRepos,
                totalStars: totalStars,
                followers: userResponse.data.followers,
                following: userResponse.data.following
            },
            languagesData: langCounts
        });

    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to sync with GitHub API.' });
    }
};