// import React from 'react'
import './Post.css'
import propTypes from 'prop-types'
import { Avatar, Typography, IconButton } from '@mui/material'
import {
    Comment, Share, HeartBroken, BarChart, RedoRounded
} from '@mui/icons-material'
import moment from 'moment'
import { Link } from 'react-router-dom'
// import { LikeTweet } from '../../../../server/controllers/Tweets.controller'
import { likeTweet } from '../../utils/function'

export let iconButtonStyles = {
    color: 'grey', gap: 1
}
const Post = ({
    author, commentor,
    createdAt, post_content,
    post_comments,
    post_likes, post_views, post_retweets, _id,reply_content, time
}) => {
    return (
        <div
            className='post-container'
        >
            <div className='post-header'>
                <Avatar src={ author?.avatar} />
                <Typography>
                    {author?.fullName || commentor?.fullName}
                    <Typography variant='body2' sx={{ ml: 1, }} color={'GrayText'}>
                        @{author?.username || commentor?.username} • {moment(createdAt || time).fromNow()}
                    </Typography>
                </Typography>

            </div>
            <div className='post-body'>
                <Link to={!commentor ? `/${author?.username}/status/${_id}` : '#'}>
                    <Typography sx={{ mt: 3 }}>
                        {post_content?.post_text || reply_content?.reply_text}
                    </Typography>
                    </Link>
                
            </div>
            {
                !commentor && (
                    <div className="post-reactions">
                        <IconButton color='info' sx={iconButtonStyles}>
                            <Comment />
                            <Typography>
                                {post_comments?.length}
                            </Typography>
                        </IconButton>
                        <IconButton color='info' sx={iconButtonStyles}>
                            <RedoRounded />
                            <Typography>
                                {post_retweets?.length}
                            </Typography>
                        </IconButton>
                        <IconButton
                            onClick={() => likeTweet({ tweetId: _id, likerId: '6482d847038cc4982fde6df4'})
                            }
                            color='info' sx={iconButtonStyles}>
                            <HeartBroken />
                            <Typography>
                                {post_likes?.length}
                            </Typography>
                        </IconButton>
                        <IconButton color='info' sx={iconButtonStyles}>
                            <BarChart />
                            <Typography>
                                {post_views?.length}
                            </Typography>
                        </IconButton>
                        <IconButton color='info' sx={iconButtonStyles}>
                            <Share />
                            <Typography>
                                {post_views?.length}
                            </Typography>
                        </IconButton>
                    </div>
                )
           }
        </div>
    )
}

Post.prototype = {
    avatar: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    author_uname: propTypes.string.isRequired,
    posted_on: propTypes.string.isRequired,
    post_content: {
        post_text: propTypes.string,
        post_image: propTypes.string
    },
    post_comments: propTypes.array,
    post_retweets: propTypes.array,
    post_likes: propTypes.array,
    post_views: propTypes.array
}

export default Post