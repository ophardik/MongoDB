import express from 'express'
import { createProduct ,getProductsWithUser} from '../Controller/productController';
const router=express.Router();

router.post("/addProduct",createProduct)
router.get('/allProducts', getProductsWithUser);


export default router
