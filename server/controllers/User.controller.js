import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";
import UserValidObject from "../validators/User.joi.js";
import createToken from "../utils/createToken.js";
import { hash } from "bcrypt";

const createUser = async (req, res, next) => {
    try {
        // validate user

        const { value, error } = UserValidObject.validate(req.body)

        if (error) {
            return next(errorResponse(400, error.details[0].message))
        }
        // check if user already exists

        let user = await User.findOne({ email: value.email })
        if (user) return next(errorResponse(400, 'user already exists'));
        // create user

        const hashedPwd = await hash(value.password, 10)
        let newUser = new User({
            fullName: value.fullName,
            email: value.email,
            username: `${value.fullName.split(' ').join('_')}`,
            password: hashedPwd
        })

        await newUser.save()

        // create token and send it as a cookie

        const token = await createToken(newUser._id)

        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
        res.cookie('access_token', token, {
            maxAge: 60 * 60 * 3600 * 24 * 7,
            httpOnly: true,
        })
        // respond with user data

        res.status(200).json({

            status: true,
            user: {
                email: newUser.email,
                username: newUser.username,
                fullName: newUser.fullName,
                followers: newUser.followers,
                followees: newUser.followees
            },
            access_token: token
        })
    } catch (error) {
        console.log('error creating user', error)
        next(errorResponse(500, 'Unexpected error occurred'))
    }
}

const getAllUsers = async (req, res, next) => {
    try {

        let { currentUserId } = req.query
        if (!currentUserId) return next(errorResponse(400, 'provide current user id'))
        let users = await User.find().select('-password').populate('followers').populate('followees');
        if (users.length > 0) return res.status(200).json({ status: true, users: users.filter(user => user?._id !== currentUserId) })
        return res.status(200).json({ status: true, message: 'no users found' })
    } catch (err) {
        console.log('error getting users: ' + err.message);
        next(errorResponse(500, 'An error occurred'))
    }
}

const getUser = async (req, res, next) => {
    try {
        let { id } = req.params
        if (!id) return res.status(400).json({ status: false, message: 'user id is required' });
        let user = await User.findById(id).select('-password').populate('followers').populate('followees')
        if (!user) return res.status(404).json({ status: false, message: 'user was not found' });
        return res.status(200).json({ status: true, user })

    } catch (error) {
        console.log('error getting user', error.message);
        next(error)
    }
}

export {
    createUser,
    getAllUsers,
    getUser
}