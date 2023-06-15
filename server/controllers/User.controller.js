import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";
import UserValidObject from "../validators/User.joi.js";
import createToken from "../utils/createToken.js";
import { hash } from "bcrypt";
import _ from 'lodash'
import { checkUser } from "../utils/functions.js";

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
            username: `${value.fullName.toLowerCase().split(' ').join('_')}`,
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
            user: _.omit(newUser, 'password'),
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
        let { username } = req.params
        if (!username) return res.status(400).json({ status: false, message: 'user id is required' });
        let user = await User.findOne({ username })
            .select('-password')
            .populate('followers')
            .populate('followees')
       
        if (!user) return res.status(404).json({ status: false, message: 'user was not found' });
        return res.status(200).json({ status: true, user })

    } catch (error) {
        console.log('error getting user', error.message);
        next(error)
    }
}


export const handleFollowUser = async (req, res, next) => {
    try {

        let { followerId, followedId } = req.body
        if (!followedId || !followerId) return next(errorResponse(500, 'please provide follower id and followee id'))

        // check if both users exist

        let follower = await checkUser(followerId)
        let followed = await checkUser(followedId)
        if (!follower || !followed) return next(errorResponse(404, 'one of the users was not found, please check the data you provided'))

        // check if follower does not already follows followed
        let check = followed.followers?.find(follower => follower._id.toString() === followerId)
        if (check) {
            await User.findByIdAndUpdate(followedId, {
                $pull: {
                    followers: followerId
                }
            })
            await User.findByIdAndUpdate(followerId, {
                $pull: {
                    followees: followedId
                }
            })

            return res.status(200).json({ status: true, message: 'follow was removed successfully' })

        }
        // update followers and followees
        await User.findByIdAndUpdate(followedId, {
            $push: {
                followers: followerId
            }
        })
        await User.findByIdAndUpdate(followerId, {
            $push: {
                followees: followedId
            }
        })
        res.status(201).json({
            status: true,
            message: `${followerId} has followed ${followedId} successfully`
        })

    } catch (error) {
        console.log('error following user', error.message);
        next(errorResponse(500, 'unexpected error occurred'));
    }
}
export {
    createUser,
    getAllUsers,
    getUser
}