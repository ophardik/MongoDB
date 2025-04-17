import { Request, Response } from "express";
import { Product } from "../Models/productModel";

interface ProductRequestBody {
  productName: string;
  productPrice: number;
  owner: string;
}

export const createProduct = async (
  req: Request<{}, {}, ProductRequestBody>, //Request<Params, ResBody, ReqBody>
  res: Response
) => {
  try {
    const { productName, productPrice, owner } = req.body;

    const product = await Product.create({
      productName,
      productPrice,
      owner,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getProductsWithUser=async(req:Request,res:Response)=>{
    try {
        const products=await Product.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"ownerDetails"
                }
            },
            {
                $unwind:"$ownerDetails" // converts ownerDetails array into single objects
            },
            
            
        
        ])
        res.json(products);
    } catch (error) {
        console.error(error)
    }
}
