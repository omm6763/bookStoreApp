import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from "./route/book.route.js";
import cors from 'cors';
import userroute from './route/user.route.js';


const app = express()

app.use(cors());
dotenv.config();

app.use(express.json());


const port = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

//connect to mongodb
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB connected');
} catch (err) {
    console.error('MongoDB connection error:', err);
}
//defining routes 
app.get("/", (req, res) => {
    res.json({ message: "BookStore API is running!", availableRoutes: ["/book", "/user"] });
});

app.use("/book", bookRoute);
app.use("/user", userroute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
