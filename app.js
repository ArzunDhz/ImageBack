// in this app folder we only apply middleware and configure
import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import ImageRouter from "./routes/imageRoutes.js";
import UserRouter from "./routes/userInfoRoutes.js";
import GoogleRouter from './routes/googleInfoRoutes.js'
import { errorMiddleware } from "./middlewares/Error.js";
import cors from "cors";
import passport  from "./middlewares/GoogleAuth.js";
import session from "express-session";
import { getGithub } from "./controllers/aftergithub.js";


config({
  path: "./data/config.env",
});


export const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.80:5173","https://image-gene.netlify.app","https://accounts.google.com/o/oauth2/v2/auth","http://localhost:6090/auth/google"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //inorder to access the cookie from the application

app.use(session({
  secret:'cat',
  resave:false,
  saveUninitialized:true,
  cookie:{ secure:false}
}))


getGithub()

app.use(passport.initialize())
app.use(passport.session())




app.get('/',(req,res)=> res.send('<a href="/auth/google">Google</a>     <a href="/auth/github"> Github </a>'))
app.use("/users", UserRouter);
app.use("/image", ImageRouter);
app.use(GoogleRouter)




app.use(errorMiddleware);
