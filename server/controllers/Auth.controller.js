import { compare } from "bcrypt"
import User from "../models/User.model.js"
import errorResponse from "../utils/errorResponse.js"
import createToken from "../utils/createToken.js"

const loginUser = async (req, res, next) => {

    try {

        let { email, password } = req.body
        if (!email || !password) return next(errorResponse(400, 'provide email address and password'))

        // check if the user exists

        let user = await User.findOne({ email }).populate('followers').populate('followees')
        if (!user) return next(errorResponse(404, `user with email ${email} was not found`))
        console.log(user)
        // compare passwords

        const isPasswordMatch = await compare(password, user.password)
        if (!isPasswordMatch) return next(errorResponse(403, `invalid email address or password`))

        // create token and send it in cookies

        const token = await createToken(user._id)
        res.cookie('access_token', token, {
            maxAge: 60 * 60 * 3600 * 24 * 7,
            httpOnly: true
        })
        // respond with user data

        res.status(200).json({
            status: true,
            user: {
                email: user.email,
                username: user.username,
                fullName: user.fullName,
                followers: user.followers,
                followees: user.followees
            },
            access_token: token
        })
    } catch (error) {
        console.log("error logging in", error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}


const logoutUser = async (req, res, next) => {

}

export const getUserProfile = async (req, res, next) => {
    try {
        
        if (req.user) {
            
        }

        next(errorResponse(401, 'you are not logged in'));
    } catch (error) {
        console.log('error getting user profile', error.message)
        next(errorResponse(500, 'unexpected error occurred'));
    }
}
export { loginUser, logoutUser }