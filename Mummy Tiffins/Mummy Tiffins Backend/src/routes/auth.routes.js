import express from "express";
import { login, logout, VerifyOtpRegister, sendOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.route("/send-otp").post(sendOtp);
authRouter.route("/verify-otp").post(VerifyOtpRegister);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

export default authRouter;