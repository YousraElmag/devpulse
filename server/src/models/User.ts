import {Schema, model}from 'mongoose';
import mongoose from 'mongoose';
const schema=new Schema({
    name:{type:String,required:true},
    email: {type:String,required:true},
    password:{type:String,required:true}
})
const UserModel=mongoose.model("User",schema);
const doc=new UserModel({name:"test",email:"test",password:"123"})
export default UserModel