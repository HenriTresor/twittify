import React from 'react'
import './Post.css'
import propTypes from 'prop-types'
import { Avatar, Typography, IconButton } from '@mui/material'
import {
    Comment, Share, HeartBroken, BarChart, RedoRounded
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

export let iconButtonStyles = {
    color: 'grey', gap: 1
}
const Post = ({
    avatar,
    author, author_uname,
    posted_on, post_content,
    post_comments,
    post_likes, post_views, post_retweets, _id
}) => {
    return (
        <div
            className='post-container'
        >
            <div className='post-header'>
                <Avatar />
                <Typography>
                    {author}
                    <Typography variant='span' sx={{ ml: 1, }} color={'GrayText'}>
                        {author_uname} • {new Date(posted_on).toLocaleDateString()}
                    </Typography>
                </Typography>

            </div>
            <div className='post-body'>
                <Link to={`/${author_uname}/status/${_id}`}>

                    <Typography sx={{ mt: 3 }}>
                        {post_content?.post_text}
                    </Typography>
                </Link>
            </div>
            <div className="post-reactions">
                <IconButton color='success' sx={iconButtonStyles}>
                    <Comment />
                    <Typography>
                        {post_comments?.length ? post_comments.length : 0}
                    </Typography>
                </IconButton>
                <IconButton color='info' sx={iconButtonStyles}>
                    <RedoRounded />
                    <Typography>
                        {post_retweets?.length ? post_retweets.length : 0}
                    </Typography>
                </IconButton>
                <IconButton color='info' sx={iconButtonStyles}>
                    <HeartBroken />
                    <Typography>
                        {post_likes?.length ? post_likes?.length : 0}
                    </Typography>
                </IconButton>
                <IconButton color='info' sx={iconButtonStyles}>
                    <BarChart />
                    <Typography>
                        {post_views?.length ? post_views?.length : 0}
                    </Typography>
                </IconButton>
                <IconButton color='info' sx={iconButtonStyles}>
                    <Share />
                    <Typography>
                        {post_views?.length ? post_views?.length : 0}
                    </Typography>
                </IconButton>
            </div>
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