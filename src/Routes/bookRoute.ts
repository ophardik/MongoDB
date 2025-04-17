import express from 'express';
import { addBook, getBook } from '../Controller/bookController';
const router=express.Router();

router.post("/addBook",addBook)
router.get("/getBook",getBook)



export default router