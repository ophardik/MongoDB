import express, { Application } from "express";
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import userRoute from './Routes/userRoute'
import productRoute from './Routes/productRoute'
import bookRoute from './Routes/bookRoute'

const app: Application = express();
const PORT = 5000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Testing")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api",userRoute)
app.use("/product",productRoute)
app.use("/book",bookRoute)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});