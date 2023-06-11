import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from "dotenv";
import cors from "cors";
import { loginUser } from "../controllers/Auth.controller.js";

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
        callbackURL: '/api/v1/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            done(null, profile)
        } catch (error) {
            done(null, error)
            console.log('error with google auth', error.message)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
router.get('/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
    res.header('Access-Control-Allow-Origin', client_uri)
})

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: client_uri,
    failureRedirect: '/api/v1/auth/google'
}))

router.get('/profile')

router.post('/login', loginUser)
export default router