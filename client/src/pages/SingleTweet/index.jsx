import React, { useEffect, useState } from 'react'
import { ArrowBack, MoreHoriz, CommentBank, ShareSharp, HeartBroken, Bookmark, Download, Photo, GifBoxOutlined, EmojiEmotions, RedoRounded } from '@mui/icons-material'
import { Typography, Avatar, IconButton, Box } from '@mui/material'
import '../../NewTweet.css'
import { iconButtonStyles } from '../../components/Post'
import './SingleTweet.css'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../components/Post'
import useFetch from '../../hooks/useFetch'
import moment from 'moment'
import serverLink from '../../utils/server.link'

const divStyles = {
    display: 'flex', justifyContent: 'start', gap: '1em', borderBottom: '1px solid gray', borderTop: '1px solid gray', width: '100%', padding: '1em'
}

const SingleTweet = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    console.log(postId)
    const [post, setPost] = useState({})
    const { data, error, isLoading } = useFetch(`${serverLink}/api/v1/tweets/${postId}`)
    console.log(data, error, isLoading)    
    useEffect(() => {
            setPost(data?.tweet)
    }, [data])
    return (
        <div
            className='body-container'
        >
            <div className="single-tweet-header">
                <IconButton color='inherit'
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant='h6' fontWeight={'bolder'}>
                    Tweet
                </Typography>
            </div>

            <div className="single-tweet-body">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2em' }}>
                        <Avatar />
                        <div>
                            <Typography>
                                {post?.author?.fullName}
                            </Typography>
                            <Typography color={'GrayText'} variant='body2'>
                                {post?.author?.username}
                            </Typography>
                        </div>
                    </div>
                    <IconButton color='inherit'>
                        <MoreHoriz />
                    </IconButton>
                </div>

                <div>
                    <Typography >
                        {post?.post_content?.post_text}
                    </Typography>
                </div>

                <div style={{ margin: '1em 0' }}>
                    <Typography color={'GrayText'} variant='body2'>
                        {moment(post?.createdAt).format('LT')} • {moment(post?.createdAt).format('ll')} • <Typography variant='span' color={'white'}>{post?.post_views?.length }</Typography> views
                    </Typography>
                </div>

                <div style={divStyles}>
                    <Typography>
                        {post?.post_retweets?.length} <Typography variant='span' color={'GrayText'}>Retweets</Typography>
                    </Typography>
                    <Typography>
                        {post?.post_likes?.length} <Typography variant='span' color={'GrayText'}>Likes</Typography>
                    </Typography>
                    {/* <Typography>
                        {post?.post_boo} <Typography variant='span' color={'GrayText'}>Bookmarks</Typography>
                    </Typography> */}
                </div>
                <div
                    style={{ ...divStyles, justifyContent: 'space-between' }}
                >
                    <IconButton sx={{ ...iconButtonStyles }} color='inherit'>
                        <CommentBank />
                    </IconButton>
                    <IconButton sx={iconButtonStyles} color='inherit'>
                        <RedoRounded />
                    </IconButton>

                    <IconButton sx={iconButtonStyles} color='inherit'>
                        <HeartBroken />
                    </IconButton>
                    <IconButton sx={iconButtonStyles} color='inherit'>
                        <Bookmark />
                    </IconButton>

                    <IconButton sx={iconButtonStyles} color='inherit'>
                        <ShareSharp />
                    </IconButton>
                </div>
                <div className="new-tweet-container">
                    <div>
                        <Avatar />
                        <textarea

                            placeholder='Tweet Your reply!'

                            type="text"></textarea>
                    </div>
                    <div>
                        <div>
                            <IconButton color='info'>
                                <Photo />
                            </IconButton>
                            <IconButton color='info'>
                                <GifBoxOutlined />
                            </IconButton>

                            <IconButton color='info'>
                                <EmojiEmotions />
                            </IconButton>

                        </div>
                        <button>
                            Reply
                        </button>
                    </div>
                </div>
            </div>

            {/* <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                _id={'4848484848488546574'}
                post_content={{ post_text: 'True!' }}
            /> */}

            {
                post?.post_comments?.length === 0 ? (
                    <Box sx={{p:2, display:'grid', placeContent:'center'}}>
                        <Typography variant='h5'>
                            No replies, Yet
                        </Typography>
                    </Box>
                ) :
            
                post?.post_comments?.map(comment => (
                    <Post {...comment} />
                ))
            }
        </div>
    )
}

export default SingleTweet