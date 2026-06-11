import UserModel from "../models/User";
import {Request,Response}from "express"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register=async(req:Request,res:Response)=>{
    try{
    const {name,email,password}=req.body;
    const userExists=await UserModel.findOne({email})
    if(userExists){
        res.status(400).json({message:"user is Exist"});
        return;
    }
const hashpassword=await bcrypt.hash(req.body.password,10)
    const newUser=new UserModel({
        name,email,password:hashpassword
    })
    await newUser.save()
    res.status(201).json({
        message:"user registed"
    })
}catch(error:any){
    console.error("Resgister Error:",error)
    res.status(500).json({
        message:"error",
        error:error.message
    })
}

}
// Log in
function generateToken(user){
    return jwt.sign({
        role:user.role,
        id:user.id,
        email:user.email,
    },
"12345",
{
    expiresIn:"1h"
})
} 
export const login=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:req.body.email})
        const comparePassword=await bcrypt.compare(req.body.password,user.password)
      if(comparePassword){

const token=generateToken(user);
res.status(200).json({
    token,
    role:user.role,
    id:user.id,
    emailAddress:user.email,
})
      }
    }catch(err){
        res.status(500).json({
            massage:err.message
        })
    }
}