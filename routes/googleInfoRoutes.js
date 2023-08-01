import express from "express";
import passport from "passport";
import {  isUserAuthnecated } from "../middlewares/Auth.js";
import { sendGoogleData } from "../controllers/googleController.js";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);



router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "/auth/github/failure",
  })
);

router.get("/auth/logindata",isUserAuthnecated ,sendGoogleData);



export default router
