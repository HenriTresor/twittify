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
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const client_uri = 'http://localhost:5173'

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        scope: ['profile', 'email'],
        callbackURL: '/api/v1/auth/google/callback'
    }, async (accessToken, refreshToken, profile, cb) => {
        let user = await User.findOne({ googleId: profile.id })
        if (user) return cb(null, user)
        user = new User({
            googleId: profile._json.sub,
            avatar:profile._json.picture,
            fullName: profile._json.name,
            email: '',
            username: profile._json.name.toLowerCase()?.split(' ').join('_'),
            

        })

        await user.save()
        cb(null, user)
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: client_uri,
    failureRedirect: '/api/auth/google/failed'
}))
router.get('/google/success', (req, res) => {
    if (req.user) {

        res.status(200).json({
            status: true,
            user: req.user
        })
        return
    }
    res.status(401).json({
        status: false,
        message: 'you are not authenticated'
    })
})

router.get('/profile', verifyToken, getUserProfile)

router.post('/login', loginUser)
export default router