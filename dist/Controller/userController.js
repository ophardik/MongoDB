"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const userModel_1 = require("../Models/userModel");
const createUser = async (req, res) => {
    try {
        const { name, email, password, status, roles } = req.body;
        const user = await userModel_1.User.create({ name, email, password, status, roles });
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.User.find({});
        res.json(users);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getAllUsers = getAllUsers;
