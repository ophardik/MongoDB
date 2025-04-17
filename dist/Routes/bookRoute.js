"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../Controller/bookController");
const router = express_1.default.Router();
router.post("/addBook", bookController_1.addBook);
router.get("/getBook", bookController_1.getBook);
exports.default = router;
