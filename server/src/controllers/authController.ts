import UserModel from "../models/User";
import {Request,Response}from "express"
import bcrypt from 'bcryptjs'
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
