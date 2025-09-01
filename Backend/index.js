// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// dotenv.config();

// const PORT = process.env.PORT || 4001;
// const URI = process.env.MongoDBURI;

// // connect to mongoDB
// try {
//     mongoose.connect(URI);
//     console.log("Connected to mongoDB");
// } catch (error) {
//     console.log("Error: ", error);
// }

// // defining routes
// app.use("/book", bookRoute);
// app.use("/user", userRoute);

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });







// course is showing not found by below code
// index.js
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";



// import bookRoute from "./route/book.route.js";
// import userRoute from "./route/user.route.js";

// // 1️⃣ Load environment variables first
// dotenv.config();

// const app = express();

// // 2️⃣ Middleware
// app.use(cors());
// app.use(express.json());

// // 3️⃣ MongoDB connection
// const PORT = process.env.PORT || 4001;
// const URI = process.env.MongoDBURI;



// app.use(cors({ origin: "*" })); // allow all for now
// mongoose.connect(URI)
// .then(() => {

  
//   console.log("MongoDB connected");

//   // 4️⃣ Start server only after DB is connected
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// })
// .catch((err) => {
//   console.log("MongoDB connection error:", err);
// });

// // 5️⃣ Routes
// app.use("/book", bookRoute);
// app.use("/user", userRoute);

// // 6️⃣ Basic test route
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import path from "path"; // <-- add this for serving frontend
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// 1️⃣ Load environment variables
dotenv.config();

const app = express();

// 2️⃣ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// 3️⃣ MongoDB connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

mongoose.connect(URI)
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

// 4️⃣ API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// 5️⃣ Serve frontend (Vite build)
const frontendPath = path.join(path.resolve(), "../Frontend/dist"); // <-- adjust path if needed
app.use(express.static(frontendPath));

// 6️⃣ SPA fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 7️⃣ Optional test route
app.get("/api/test", (req, res) => {
  res.send("Backend is running!");
});
