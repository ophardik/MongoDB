import {Schema,model,Document, Types} from "mongoose";


export interface IProduct extends Document{
    productName:string,
    productPrice:number,
    owner:Types.ObjectId,
}

const productSchema=new Schema<IProduct>({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Product=model<IProduct>("Product",productSchema)