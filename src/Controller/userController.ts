import { Request, Response } from "express";
import { User } from "../Models/userModel";


export const createUser=async(req:Request,res:Response)=>{
    try {
        const {name,email,password,status}=req.body;
        const user=await User.create({name,email,password,status});
        res.status(201).json(user)
    } catch (error) {
        console.error(error)
    }
}

export const getAllUsers=async(req:Request,res:Response)=>{
    try {
       const users=await User.find({}); 
       res.json(users)
    } catch (error) {
        console.error(error)
    }
}