import { Request, Response } from "express";
import { Book } from "../Models/bookModel";
interface BookRequestBody{
    bookName:string,
    bookPrice:number,
    owner:string,
    category:string,
    productId:string,
    role?:string
}


export const addBook=async(
  req: Request<{}, {}, BookRequestBody> //Request<Params, ResBody, ReqBody>
    ,res:Response
)=>{
    try {
        const{bookName,bookPrice,owner,category,productId,role}=req.body;
        const book=await Book.create({bookName,bookPrice,owner,category,productId,role})
        res.json(book)
    } catch (error) {
        console.error(error)
    }
}


export const  getBook=async(req:Request,res:Response)=>{
    try {
        const books = await Book.aggregate([
          {
            $lookup: {
              from: "users",
              let: { ownerId: "$owner" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$_id", "$$ownerId"] },
                        { $eq: ["$status", "active"] }
                      ]
                    }
                  }
                }
              ],
              as: "ownerDetails"
            }
          },
          {
            $lookup: {
              from: "products",
              let: { productId: "$productId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$_id", "$$productId"] },
                        { $gt: ["$productPrice", 100] }
                      ]
                    }
                  }
                },
                {
                  $lookup: {
                    from: "users",
                    let: { role: "$role" },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ["$role", "admin"]
                          }
                        }
                      }
                    ],
                    as: "userDetails"
                  }
                }
              ],
              as: "productDetails" 
            }
          }
          
        ]);
      
        res.json(books);
      } catch (error) {
        console.error(error);
      }
      
}
//$expr :allows using aggregation expressions inside $match
/* $eq : is used to compare values

$_id :is from the user

$$ownerId: is from the book */