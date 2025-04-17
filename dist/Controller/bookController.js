"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.addBook = void 0;
const bookModel_1 = require("../Models/bookModel");
const addBook = async (req //Request<Params, ResBody, ReqBody>
, res) => {
    try {
        const { bookName, bookPrice, owner } = req.body;
        const book = await bookModel_1.Book.create({ bookName, bookPrice, owner });
        res.json(book);
    }
    catch (error) {
        console.error(error);
    }
};
exports.addBook = addBook;
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
const getBook = async (req, res) => {
    try {
        const books = await bookModel_1.Book.aggregate([
            {
                $lookup: {
                    from: "users",
                    let: { ownerId: "$owner" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", "$$ownerId"] }, // Single $ is used for fields
                                        //Double $$ is used for variables inside aggregation
                                        { $eq: ["$status", "active"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "ownerDetails"
                }
            }
        ]);
        res.json(books);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getBook = getBook;
