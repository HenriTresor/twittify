import TweetsModel from '../models/Tweets.model.js'
import User from '../models/User.model.js'

let checkUser = async (id) => {
    let user = await User.findById(id)
    return user ? true : false
}

let checkTweet = async (id) => {
    let tweet = await TweetsModel.findById(id)

    return tweet ? tweet : false
}
export {
    checkUser,
    checkTweet
}