import { Schema, model } from 'mongoose'

const TweetSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        required: true, ref: 'users'
    },
    post_content: {
        post_text: {
            type: String,
        },
        post_image: {
            type: String
        }
    },
    post_comments: [
        {
            commentor: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            reply_content: {
                reply_text: {
                    type: String,
                },
                reply_image: {
                    type: String
                }
            },
            time: {
                type: Date,
            }
        }
    ],
    post_likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    post_retweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    post_views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    type: {
        type: String,
        enum: ['reply', 'actual-tweet', 'retweeted'],
        required: true,
        default: 'actual-tweet',
    },
    audience: {
        type: String,
        enum: ['everyone', 'circle'],
        default: 'everyone'
    }

},
    {
        timestamps: true
    })

export default model('tweets', TweetSchema);

