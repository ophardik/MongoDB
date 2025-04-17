import {Schema,model,Document} from "mongoose";


export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    status:"active" | "inactive",
    roles:string
   
}

const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive"],
        required:true
    },
    roles:{
        type:String,
        required:true
       
    }

})

export const User=model<IUser>("User",userSchema)