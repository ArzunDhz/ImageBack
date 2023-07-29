// in this app folder we only apply middleware and configure
import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import ImageRouter from "./routes/imageRoutes.js";
import UserRouter from "./routes/userInfoRoutes.js";
import { errorMiddleware } from "./middlewares/Error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

export const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.80:5173","https://image-gene.netlify.app/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //inorder to access the cookie from the application

app.use("/users", UserRouter);
app.use("/image", ImageRouter);




app.use(errorMiddleware);
