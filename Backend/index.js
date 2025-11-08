import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// 1️Load environment variables
dotenv.config();

const app = express();

// 2️⃣ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());











// 3️ MongoDB connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// 4️ API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Backend is running! :)");
});


// 5️ Optional test route
app.get("/api/test", (req, res) => {
  res.send("Backend is running!");
});
