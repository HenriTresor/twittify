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
import { findIfLiked, likeTweet } from '../../utils/function'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { iconButtonStyles } from '../Aside/buttonStyles'
import { useState } from 'react'


const Post = ({
    author, commentor,
    createdAt, post_content,
    post_comments, audience,
    post_likes, post_retweets, _id, reply_content,
    time
}) => {
    const navigate = useNavigate()
    const [post, setPost] = useState({
        author: author,
        createdAt: createdAt,
        _id: _id,
        post_content: post_content,
        post_likes: post_likes,

    })
    const { user, isLoggedIn } = useSelector(state => state.auth)

    const handleLiking = async () => {
        if (isLoggedIn) {
            await likeTweet({ tweetId: _id, likerId: user?._id })
            findIfLiked(post, user) ? setPost(prev => ({ ...prev, post_likes: prev.post_likes?.filter(like => like?.username !== user?.username) }))
                : setPost(prev => ({ ...prev, post_likes: [...prev.post_likes, user] }))
            return
        }
        alert('you have to login first to react to this tweet')
    }
    return (
        <div
            className='post-container'
        >
            <div
                onClick={() => {
                    navigate(`/${author?.username || commentor?.username}`)
                }}
                className='post-header'>
                <Avatar src={author?.avatar || commentor?.avatar} />
                <Typography>
                    {author?.fullName || commentor?.fullName}
                    <Typography variant='body2' sx={{ ml: 1, display: 'flex', alignItems: 'center' }} color={'GrayText'}>
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
                    {
                        post_content?.post_image && (
                            <img
                                src={post_content?.post_image}
                            />
                        )
                    }
                </Link>

            </div>
            {
                !commentor && (
                    <div className="post-reactions">
                        <IconButton

                            onClick={handleLiking}

                            sx={{
                                ...iconButtonStyles, color: findIfLiked(post, user) ? 'green' : 'grey',
                                border: 'none', p: '0'
                            }}>
                            <HeartBroken />
                            <Typography>
                                {post?.post_likes?.length}
                            </Typography>
                        </IconButton>
                        <IconButton color='info'
                            onClick={() => {
                                navigate(`/${author?.username}/status/${post?._id}`)
                            }}
                            sx={iconButtonStyles}>
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
    createdAt: propTypes.string,
    commentor: propTypes.object,
    audience: propTypes.string,
    time: propTypes.string,
    _id: propTypes.string,
    reply_content: propTypes.object,
}

export default Post