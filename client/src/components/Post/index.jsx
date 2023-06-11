<<<<<<< HEAD
import React from 'react'
=======
// import React from 'react'
>>>>>>> test
import './Post.css'
import propTypes from 'prop-types'
import { Avatar, Typography, IconButton } from '@mui/material'
import {
    Comment, Share, HeartBroken, BarChart, RedoRounded
} from '@mui/icons-material'
import moment from 'moment'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
=======
// import { LikeTweet } from '../../../../server/controllers/Tweets.controller'
import { likeTweet } from '../../utils/function'
>>>>>>> test

export let iconButtonStyles = {
    color: 'grey', gap: 1
}
const Post = ({
<<<<<<< HEAD
    author,
    createdAt, post_content,
    post_comments,
    post_likes, post_views, post_retweets, _id
=======
    author, commentor,
    createdAt, post_content,
    post_comments,
    post_likes, post_views, post_retweets, _id,reply_content, time
>>>>>>> test
}) => {
    return (
        <div
            className='post-container'
        >
            <div className='post-header'>
<<<<<<< HEAD
                <Avatar />
                <Typography>
                    {author?.fullName}
                    <Typography variant='body2' sx={{ ml: 1, }} color={'GrayText'}>
                        {author?.username} • {moment(createdAt).fromNow()}
=======
                <Avatar src={ author?.avatar} />
                <Typography>
                    {author?.fullName || commentor?.fullName}
                    <Typography variant='body2' sx={{ ml: 1, }} color={'GrayText'}>
                        @{author?.username || commentor?.username} • {moment(createdAt || time).fromNow()}
>>>>>>> test
                    </Typography>
                </Typography>

            </div>
            <div className='post-body'>
<<<<<<< HEAD
                <Link to={`/${author?.username?.split('@')[1]}/status/${_id}`}>

                    <Typography sx={{ mt: 3 }}>
                        {post_content?.post_text}
                    </Typography>
                </Link>
            </div>
            <div className="post-reactions">
                <IconButton color='success' sx={iconButtonStyles}>
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
                <IconButton color='info' sx={iconButtonStyles}>
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
=======
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
>>>>>>> test
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