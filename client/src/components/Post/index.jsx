// import React from 'react'
import './Post.css'
import { Avatar, Typography, IconButton } from '@mui/material'
import {
    Comment,
    Share, Public, GroupRounded, HeartBroken, BarChart, RedoRounded
} from '@mui/icons-material'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
// import { LikeTweet } from '../../../../server/controllers/Tweets.controller'
import { likeTweet } from '../../utils/function'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { iconButtonStyles } from '../Aside/buttonStyles'


const Post = ({
    author, commentor,
    createdAt, post_content,
    post_comments,audience,
    post_likes, post_views, post_retweets, _id, reply_content,
    time
}) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    return (
        <div
            className='post-container'
        >
            <div
                onClick={() => {
                    navigate(`/${author?.username || commentor?.username}`)
                }}
                className='post-header'>
                <Avatar src={author?.avatar} />
                <Typography>
                    {author?.fullName || commentor?.fullName}
                    <Typography variant='body2' sx={{ ml: 1, display:'flex', alignItems:'center'}} color={'GrayText'}>
                        @{author?.username || commentor?.username} • {moment(createdAt || time).fromNow()} • {
                            !commentor && (
                                <Typography sx={{ display: 'flex', alignItems: 'center', }}> {audience === 'everyone' ? <Public /> : <GroupRounded />}</Typography>
                            )
                        }
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
                            onClick={() => {
                                likeTweet({ tweetId: _id, likerId: user?._id })
                                
                            }}

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

Post.propTypes = {
    avatar: propTypes.string,
    author: propTypes.object.isRequired,
    post_content: propTypes.object,
    post_comments: propTypes.array,
    post_retweets: propTypes.array,
    post_likes: propTypes.array,
    post_views: propTypes.array,
    createdAt: propTypes.string,
    commentor: propTypes.object,
    audience: propTypes.string,
    time: propTypes.string,
    _id: propTypes.string,
    reply_content: propTypes.object,
}

export default Post