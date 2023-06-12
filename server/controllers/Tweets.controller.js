import TweetsModel from '../models/Tweets.model.js'
import Tweet from '../models/Tweets.model.js'
import errorResponse from '../utils/errorResponse.js'
import { checkTweet, checkUser } from '../utils/functions.js'
import { ObjectId } from 'mongoose'

export const createTweet = async (req, res, next) => {
    try {

        let { author, post_content, type, audience } = req.body
        if (!author || post_content === null) return next(errorResponse(400, 'please provide the required data'))

        // check if author exists
        let user = await checkUser(author)
        if (!user) return next(errorResponse(404, `user with ${author} id was not found`))

        // create the tweet

        let newTweet = new TweetsModel({
            author,
            post_content,
            type,
            audience
        })

        await newTweet.save()

        res.status(201).json({
            status: true,
            newTweet: await newTweet.populate('author')
        })

    } catch (error) {
        console.log('error creating new tweet', error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}
export const getTweets = async (req, res, next) => {
    try {

        let tweets = await TweetsModel.find({}).populate('author').sort({ createdAt: -1 })
        res.status(200).json({
            status: true,
            tweets
        })
    } catch (error) {
        console.log('eror getting tweets', error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}
export const getTweet = async (req, res, next) => {
    try {

        let { id } = req.params
        let tweet = await TweetsModel.findById(id).populate({
            path: 'post_comments',
            populate: {
                path: 'commentor',
                model: 'users'
            }
        })
            .populate("author").populate('post_likes')
        if (!tweet) return next(errorResponse(404, `tweet with ${id} id was not found`))
        res.status(200).json({ status: true, tweet })
    } catch (error) {
        next(errorResponse(500, 'unexpected error occurred'))
    }
}


export const createReply = async (req, res, next) => {
    try {

        let { author, reply_content, tweetId, time } = req.body

        // check if author exists

        let user = await checkUser(author)
        if (!user) return next(errorResponse(404, `user with ${autho} id was not found`))

        // check if tweet exists

        let tweet = await checkTweet(tweetId)
        if (!tweet) return next(errorResponse(404, `${tweetId} tweet was not found`))

        // create a reply

        await TweetsModel.findByIdAndUpdate(tweetId, {
            $push: {
                post_comments: {
                    commentor: author,
                    reply_content,
                    time
                }
            }
        })

        res.status(201).json({
            status: true,
            message: 'reply was added successfully!'
        })
    } catch (error) {
        console.log('error creating reply:', error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}

export const LikeTweet = async (req, res, next) => {
    try {

        let { tweetId, likerId } = req.body

        // check user
        let user = await checkUser(likerId)
        if (!user) return next(errorResponse(404, 'user not found'))
        // console.log(user)

        // check tweet

        let tweet = await checkTweet(tweetId)
        if (!tweet) return next(errorResponse(404, 'tweet not found'))

        // check if does'nt alredy like the tweet

        let check = tweet?.post_likes?.find(like => like.toString() === likerId)
        if (check) return next(errorResponse(409, 'user already likes the tweet'))
        // add like

        await TweetsModel.findByIdAndUpdate(tweetId, {
            $push: {
                post_likes: likerId
            }
        })

        // console.log('likedd')
        res.status(201).json({ status: true, message: 'like added successfully' })
    } catch (error) {
        console.log("error liking tweet", error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}

export const getTweetsByUser = async (req, res, next) => {
    try {

        let { id } = req.params

        // check user

        let user = await checkUser(id)
        if (!user) return next(errorResponse(404, `user with ${id} id was not found`))

        //

        let userTweets = await TweetsModel.find({ author: id }).populate('post_likes')
        res.status(200).json({
            status: true,
            tweets: userTweets
        })
    } catch (error) {
        console.log('error gettingTweetsByUser', error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}
