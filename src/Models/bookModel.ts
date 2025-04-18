import {Schema,model,Document, Types} from "mongoose";


export interface IBook extends Document{
    bookName:string,
    bookPrice:number,
    owner:Types.ObjectId,
    category:string,
    productId:Types.ObjectId,
    role:Types.ObjectId,
}

const bookSchema=new Schema<IBook>({
    bookName:{
        type:String,
        required:true
    },
    bookPrice:{
        type:Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    category:{
        type:String,
        required:true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
})

export const Book=model<IBook>("Book",bookSchema)