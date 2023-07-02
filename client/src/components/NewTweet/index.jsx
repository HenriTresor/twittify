import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, TextField, CircularProgress, Fab, Typography, Button } from '@mui/material'
import {
    Photo, GifBoxOutlined, Poll,
    EmojiEmotions,
    CalendarToday, LocationOn, ArrowRight, Add, Close
} from '@mui/icons-material'
import '../../NewTweet.css'
import axios from 'axios'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { handleLiking } from '../../utils/function'
import EmojiPicker from 'emoji-picker-react'
import { Select, MenuItem, FormControl } from '@mui/material'

const NewTweet = ({ setIsOpen }) => {

    const { user } = useSelector(state => state.auth)
    let [post_content, setPost_content] = useState({
        post_text: '',
        post_image: '',
    })
    const [audience, setAudience] = useState('everyone')
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const navigate = useNavigate()
    let [isPosting, setIsPosting] = useState(false)
    const createPost = async () => {
        setIsPosting(true)
        try {
            let tweet = {
                author: user?._id,
                post_content,
                type: 'actual-tweet',
                audience
            }


            const res = await axios.post(`${serverLink}/api/v1/tweets`, tweet, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setIsPosting(false)
            if (res.data.status) {
                navigate(`/${res.data.newTweet.author?.username}/status/${res.data.newTweet._id}`)
                setIsOpen(false)
                return
            }
            alert(res.response.data.message)
        } catch (error) {
            setIsPosting(false)
            alert('error: ' + error.response.data.message)

        }
    }
    return (
        <>
            <div
                className='new-tweet-container'
            >
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
                                onEmojiClick={(e) => setPost_content(prev => ({ ...prev, post_text: prev.post_text + e.emoji }))}
                            />
                        </div>
                    )
                }
                <select name="audience" onChange={(e) => setAudience(e.target.value)} id="">
                    <option value="everyone">everyone</option>
                    <option value="circle">circle</option>
                </select>
                <div>

                    <Avatar
                        src={`${user?.avatar}`}
                    />

                    <textarea
                        value={post_content.post_text}
                        placeholder='What is happening?!'
                        onChange={(e) => setPost_content({ ...post_content, post_text: e.target.value })}
                        type="text"></textarea>
                </div>
                <div>
                    <div>
                        <label htmlFor="photo">
                            {/* <IconButton color='info'> */}
                            <Typography color={'#1d98f0'} sx={{ p: '0.6em', cursor: 'pointer' }}>
                                {post_content?.post_image ? 'image added. change' : <Photo />}
                            </Typography>

                            {/* </IconButton> */}
                        </label>
                        {
                            post_content?.post_image && (
                                <Button
                                    onClick={() => setPost_content(prev => ({ ...prev, post_image: '' }))}
                                    startIcon={<Close />}>
                                    remove
                                </Button>
                            )
                        }
                        <input type="file" name="photo" style={{ display: 'none' }} id="photo" onChange={(e) => {
                            e.target.files[0].type?.split('/')[0] === 'image' ? setPost_content(prev => ({ ...prev, post_image: e.target.files[0] })) : alert('you have to choose a photo')
                        }} />
                        {/* <IconButton color='info'
                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                        >
                            <EmojiEmotions />
                        </IconButton> */}
                    </div>

                    <button disabled={isPosting || (!post_content.post_image && !post_content.post_text)} onClick={() => createPost()}>
                        {
                            isPosting ? <CircularProgress color='inherit' size='2em' /> : 'tweet'
                        }
                    </button>

                </div>
            </div>
        </>
    )
}

export default NewTweet