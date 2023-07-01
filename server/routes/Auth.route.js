import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from "dotenv";
import cors from "cors";
import { getUserProfile, loginUser } from "../controllers/Auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/User.model.js";

config()

const router = Router();
router.use(cors({
    origin: '*',
    credentials: true
}))

router.get('/profile', verifyToken, getUserProfile)

router.post('/login', loginUser)
export default router