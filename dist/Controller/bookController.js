"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.addBook = void 0;
const bookModel_1 = require("../Models/bookModel");
const addBook = async (req //Request<Params, ResBody, ReqBody>
, res) => {
    try {
        const { bookName, bookPrice, owner, category, productId, role } = req.body;
        const book = await bookModel_1.Book.create({ bookName, bookPrice, owner, category, productId, role });
        res.json(book);
    }
    catch (error) {
        console.error(error);
    }
};
exports.addBook = addBook;
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.getBook = getBook;
//$expr :allows using aggregation expressions inside $match
/* $eq : is used to compare values

$_id :is from the user

$$ownerId: is from the book */ 
