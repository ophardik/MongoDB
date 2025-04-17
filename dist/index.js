"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose")); // Import mongoose for MongoDB connection
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const productRoute_1 = __importDefault(require("./Routes/productRoute"));
const bookRoute_1 = __importDefault(require("./Routes/bookRoute"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/Testing")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api", userRoute_1.default);
app.use("/product", productRoute_1.default);
app.use("/book", bookRoute_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
