import React from 'react'
import { ArrowBack, MoreHoriz, CommentBank, ShareSharp, HeartBroken, Bookmark, Download, Photo, GifBoxOutlined, EmojiEmotions, RedoRounded } from '@mui/icons-material'
import { Typography, Avatar, IconButton } from '@mui/material'
import '../../NewTweet.css'
import { iconButtonStyles } from '../../components/Post'
import './SingleTweet.css'
import { useNavigate } from 'react-router-dom'
import Post from '../../components/Post'

const divStyles = {
    display: 'flex', justifyContent: 'start', gap: '1em', borderBottom: '1px solid gray', borderTop: '1px solid gray', width: '100%', padding: '1em'
}

const SingleTweet = () => {
    const navigate = useNavigate()
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
                                Full name
                            </Typography>
                            <Typography color={'GrayText'}>
                                @username
                            </Typography>
                        </div>
                    </div>
                    <IconButton color='inherit'>
                        <MoreHoriz />
                    </IconButton>
                </div>

                <div>
                    <Typography >
                        Nice To be back
                    </Typography>
                </div>

                <div style={{ margin: '1em 0' }}>
                    <Typography color={'GrayText'} variant='body2'>
                        6:28 PM • Jun 7, 2023 • <Typography variant='span' color={'white'}>6,324</Typography> views
                    </Typography>
                </div>

                <div style={divStyles}>
                    <Typography>
                        28 <Typography variant='span' color={'GrayText'}>Retweets</Typography>
                    </Typography>
                    <Typography>
                        74 <Typography variant='span' color={'GrayText'}>Likes</Typography>
                    </Typography>
                    <Typography>
                        53 <Typography variant='span' color={'GrayText'}>Bookmarks</Typography>
                    </Typography>
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

            <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                _id={'4848484848488546574'}
                post_content={{ post_text: 'True!' }}
            />
        </div>
    )
}

export default SingleTweet