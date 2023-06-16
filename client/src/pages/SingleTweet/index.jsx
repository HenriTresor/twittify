// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { ArrowBack, MoreHoriz, Public, GroupRounded, CommentBank, ShareSharp, HeartBroken, Bookmark, Photo, GifBoxOutlined, EmojiEmotions, RedoRounded, } from '@mui/icons-material'
import { Typography, Avatar, IconButton, Box, Snackbar } from '@mui/material'
import '../../NewTweet.css'
import './SingleTweet.css'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../components/Post'
import useFetch from '../../hooks/useFetch'
import moment from 'moment'
import serverLink from '../../utils/server.link'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { findIfLiked, likeTweet } from '../../utils/function'
import EmojiPicker from 'emoji-picker-react'
import { iconButtonStyles } from '../../components/Aside/buttonStyles'

const divStyles = {
    display: 'flex', justifyContent: 'start', gap: '1em', borderBottom: '1px solid gray', borderTop: '1px solid gray', width: '100%', padding: '1em'
}

const SingleTweet = () => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const { postId } = useParams()
    const [isReplying, setIsReplying] = useState(false)
    const [reply_content, setReply_content] = useState({
        reply_text: '',
        reply_image: ''
    })
    const [SnackbarMsg, setSnackbarMsg] = useState(null)
    const [post, setPost] = useState({})
    const { data, error, isLoading } = useFetch(`${serverLink}/api/v1/tweets/${postId}`)
    useEffect(() => {
        setPost(data?.tweet)
    }, [data])

    const createReply = async () => {
        setIsReplying(true)
        try {
            let reply = {
                author: user?._id,
                reply_content,
                tweetId: post?._id,
                time: moment().format()
            }
            const res = await axios.put(`${serverLink}/api/v1/tweets/reply`, reply)
            setIsReplying(false)
            setSnackbarMsg(res.data.message)
        } catch (error) {
            setIsReplying(false)
            setSnackbarMsg('an error occurred')
        }
    }
    return (
        <div
            className='body-container'
        >

            <Snackbar
                open={SnackbarMsg}
                onClose={() => setSnackbarMsg(null)}
                autoHideDuration={7000}
                message={SnackbarMsg}
            />
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
            {
                isLoading ? <Loading /> : error.status
                    ? <Error />
                    : data !== null ? (
                        <>


                            <div className="single-tweet-body">
                                <div>
                                    <div
                                        onClick={() => {
                                            navigate(`/${post?.author?.username}`)
                                        }}
                                        style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: '1.2em' }}>
                                        <Avatar />
                                        <div>
                                            <Typography>
                                                {post?.author?.fullName}
                                            </Typography>
                                            <Typography color={'GrayText'} variant='body2'>
                                                @{post?.author?.username}
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
                                        {moment(post?.createdAt).format('LT')} • {moment(post?.createdAt).format('ll')} • <Typography variant='span' color={'white'}>{post?.post_views?.length}</Typography> views
                                    </Typography>
                                </div>

                                <div style={divStyles}>
                                    <Typography>
                                        {post?.post_retweets?.length} <Typography variant='span' color={'GrayText'}>Retweets</Typography>
                                    </Typography>
                                    <Typography>
                                        {post?.post_likes?.length} <Typography variant='span' color={'GrayText'}>Likes</Typography>
                                    </Typography>
                                    <Typography>
                                        {post?.post_comments?.length} <Typography variant='span' color={'GrayText'}>Comments</Typography>
                                    </Typography>
                                    <Typography sx={{ display: 'flex', gap: 1 }}>
                                        {post?.audience === 'everyone' ? <Public /> : <GroupRounded />}
                                    </Typography>
                                </div>
                                <div
                                    className='post-reactions'
                                    style={{ ...divStyles, justifyContent: 'space-evenly' }}
                                >
                                    <IconButton

                                        sx={
                                            {
                                                ...iconButtonStyles,
                                                color: findIfLiked(post, user) ? 'green' : 'grey', border: findIfLiked(post, user) ? '1px solid green' : 'none'
                                            }}
                                        onClick={async () => {
                                            await likeTweet({ tweetId: post._id, likerId: user?._id })
                                            findIfLiked(post, user) ? setPost(prev => ({ ...prev, post_likes: prev.post_likes?.filter(like => like?.username !== user?.username) }))
                                                : setPost(prev => ({ ...prev, post_likes: [...prev.post_likes, user] }))
                                        }}
                                    >
                                        <HeartBroken />
                                    </IconButton>
                                  
                                    <IconButton sx={iconButtonStyles} color='inherit'>
                                        <RedoRounded />
                                    </IconButton>

                                    <IconButton sx={{ ...iconButtonStyles }} color='inherit'>
                                        <Bookmark  />
                                    </IconButton>

                                </div>
                                {
                                    user && (
                                        <>
                                            <div className="new-tweet-container">
                                                {
                                                    isEmojiPickerOpen && (
                                                        <div className='emoji-picker'>
                                                            <EmojiPicker
                                                                lazyLoadEmojis={true}
                                                                theme='dark'
                                                                previewConfig={{
                                                                    showPreview: true
                                                                }}
                                                                emojiStyle='facebook'
                                                                onEmojiClick={(e) => setReply_content(prev => ({ ...prev, reply_text: prev.reply_text + e.emoji }))}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                <div>
                                                    <Avatar />
                                                    <textarea
                                                        value={reply_content.reply_text}
                                                        placeholder='Tweet Your reply!'
                                                        onChange={(e) => setReply_content({ ...reply_content, reply_text: e.target.value })}
                                                        type="text"></textarea>
                                                </div>
                                                <div>
                                                    <div>
                                                        <IconButton color='info'>
                                                            <Photo />
                                                        </IconButton>

                                                        <IconButton
                                                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                                            color='info'>
                                                            <EmojiEmotions />
                                                        </IconButton>

                                                    </div>
                                                    <button disabled={isReplying} onClick={createReply}>
                                                        {
                                                            isReplying ? '...' : 'reply'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            {/* <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                _id={'4848484848488546574'}
                post_content={{ post_text: 'True!' }}
            /> */}
                            <Typography sx={{ m: '1em 0.2em' }} variant='h6' component={'h1'}>
                                Recent Replies
                            </Typography>

                            {
                                post?.post_comments?.length === 0 ? (
                                    <Box sx={{ p: 2, display: 'grid', placeContent: 'center' }}>
                                        <Typography variant='h5'>
                                            No replies, Yet
                                        </Typography>
                                    </Box>
                                ) :

                                    post?.post_comments?.map(comment => {
                                  
                                        return <Post {...comment} key={comment?.time} />
                                    })
                            }
                        </>
                    ) : <Error />




            }
        </div>
    )
}

export default SingleTweet