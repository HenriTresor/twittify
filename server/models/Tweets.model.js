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
            type: Schema.Types.ObjectId,
            ref: 'users'
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
    ]

},
    {
        timestamps: true
    })

export default model('tweets', TweetSchema);

