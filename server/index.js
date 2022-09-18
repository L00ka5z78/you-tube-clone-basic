import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("connected to Database")
        })
        .catch((err) => {
            throw err;
        });
};

app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/comments", commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        succes: false,
        status,
        message,
    })
})

app.listen(8800, () => {
    connect()
    console.log("Server is ON and running!")
});