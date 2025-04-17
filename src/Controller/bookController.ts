import { Request, Response } from "express";
import { Book } from "../Models/bookModel";
interface BookRequestBody{
    bookName:string,
    bookPrice:number,
    owner:string,
    category:string
}


export const addBook=async(
  req: Request<{}, {}, BookRequestBody> //Request<Params, ResBody, ReqBody>
    ,res:Response
)=>{
    try {
        const{bookName,bookPrice,owner,category}=req.body;
        const book=await Book.create({bookName,bookPrice,owner,category})
        res.json(book)
    } catch (error) {
        console.error(error)
    }
}


// export const getBook=async(req:Request,res:Response)=>{
//     try {
//       const books=await Book.aggregate([
//         {
//             $lookup:{
//                 from:"users",
//                 localField:"owner",
//                 foreignField:"_id",
//                 as:"ownerDetails"
//             }
//         }
//       ])
//       res.json(books)
//     } catch (error) {
//         console.error(error)
//     }
// }

export const  getBook=async(req:Request,res:Response)=>{
    try {
       const books=await Book.aggregate([
        {
            $lookup:{
                from:"users", // Name of the collection you're joining with
                let:{ownerId:"$owner"}, // Define a variable 'ownerId' = current book's 'owner' field
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                    {$eq:["$_id","$$ownerId"]}, // Single $ is used for fields
                                    //Double $$ is used for variables inside aggregation // Only match user whose _id == book's owner
                                    {$eq:["$status","active"]}  // Only match users whose status is 'active'
                                ]
                            }
                        }
                    }
                ]
                ,as:"ownerDetails" // The result will be stored in this field in the final book document
            }
        }
       ])
       res.json(books)
    } catch (error) {
        console.error(error)
    }
}
//$expr allows using aggregation expressions inside $match
/* $eq is used to compare values

$_id is from the user

$$ownerId is from the book */