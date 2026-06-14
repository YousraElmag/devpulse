import {Request,Response,NextFunction}from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request{
    user?:any;
}
export const protect=(req:AuthRequest,res:Response,next:NextFunction)=>{

    const authHeader=req.headers.authorization;
    const token=authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({
            message:'no token'
        })
        return;
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET as string) 
        req.user=decoded;
        next();
    }catch(error){
        res.status(401).json({message:"expired token"})
    }
}
