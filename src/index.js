"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose"); // Import mongoose for MongoDB connection
var app = (0, express_1.default)();
var PORT = 5000;
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/Testing")
    .then(function () { return console.log("Connected to MongoDB"); })
    .catch(function (err) { return console.error("MongoDB connection error:", err); });
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
