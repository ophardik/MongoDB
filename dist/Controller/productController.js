"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithUser = exports.createProduct = void 0;
const productModel_1 = require("../Models/productModel");
const createProduct = async (req, //Request<Params, ResBody, ReqBody>
res) => {
    try {
        const { productName, productPrice, owner } = req.body;
        const product = await productModel_1.Product.create({
            productName,
            productPrice,
            owner,
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
exports.createProduct = createProduct;
const getProductsWithUser = async (req, res) => {
    try {
        const products = await productModel_1.Product.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            {
                $unwind: "$ownerDetails" // converts ownerDetails array into single objects
            },
        ]);
        res.json(products);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getProductsWithUser = getProductsWithUser;
