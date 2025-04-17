"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
