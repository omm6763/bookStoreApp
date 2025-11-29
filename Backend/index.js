import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import orderRoute from "./route/order.route.js";
import reviewRoute from "./route/review.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

mongoose.connect(URI).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

// API Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/review", reviewRoute);


app.get("/", (req, res) => {
    res.send("BookStore Backend is running successfully! 🚀");
});
// --------------------------------

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});