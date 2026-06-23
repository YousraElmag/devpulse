import {Router} from "express";
import {register,login,getMe,getGithubStatus,githubCallback} from "../controllers/authController";
import {protect}from  '../middleware/authMiddleware'
const router=Router();
router.post('/register',register)
router.post('/login',login)
router.get('/verify',protect,getMe)
router.get('/github-stats',protect,getGithubStatus)
router.get('/auth/github/callback', githubCallback);
export default router