import express from 'express';
import { createUser, getAllUsers } from '../Controller/userController';
const router=express.Router();

router.post("/addUser",createUser)
router.get("/allUsers",getAllUsers)

export default router