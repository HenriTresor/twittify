import TweetsModel from '../models/Tweets.model.js'
import Tweet from '../models/Tweets.model.js'
import errorResponse from '../utils/errorResponse.js'
import { checkUser } from '../utils/user.functions.js'

export const createTweet = async (req, res, next) => {
    try {

        let { author, post_content, type } = req.body
        if (!author || post_content === null) return next(errorResponse(400, 'please provide the required data'))

        // check if author exists
        let user = await checkUser(author)
        if (!user) return next(errorResponse(404, `user with ${author} id was not found`))

        // create the tweet

        let newTweet = new TweetsModel({
            author,
            post_content,
            type
        })

        await newTweet.save()

        res.status(201).json({
            status: true,
            newTweet
        })

    } catch (error) {
        console.log('error creating new tweet', error.message)
        next(errorResponse(500, 'unexpected error occurred'))
    }
}
export const getTweets = async (req, res, next) => {
    try {

        let tweets = await TweetsModel.find({}).populate('author')
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
        let tweet = await TweetsModel.findById(id)
        if (!tweet) return next(errorResponse(404, `tweet with ${id} id was not found`))
        res.status(200).json({ status: true, tweet })
    } catch (error) {
        next(errorResponse(500, 'unexpected error occurred'))
    }
}

