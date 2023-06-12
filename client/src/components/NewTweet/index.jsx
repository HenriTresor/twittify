import React, { useState } from 'react'
import { Avatar, IconButton, TextField, CircularProgress } from '@mui/material'
import {
    Photo, GifBoxOutlined, Poll,
    EmojiEmotions,
    CalendarToday, LocationOn, ArrowRight
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

const NewTweet = ({setIsOpen}) => {

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

            const res = await axios.post(`${serverLink}/api/v1/tweets`, tweet)
            setIsPosting(false)
            console.log('tweetin response', res)
            if (res.data.status) {
                navigate(`/${res.data.newTweet.author?.username}/status/${res.data.newTweet._id}`)
                setIsOpen(false)
                return
            }
            alert(res.response.data.message)
        } catch (error) {
            setIsPosting(false)
            alert('error: ' + error.response.data.message)
            console.log(error)
        }
    }
    return (
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

                <Avatar />

                <textarea
                    value={post_content.post_text}
                    placeholder='What is happening?!'
                    onChange={(e) => setPost_content({ ...post_content, post_text: e.target.value })}
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
                        <Poll />
                    </IconButton>
                    <IconButton color='info'
                        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    >
                        <EmojiEmotions />
                    </IconButton>
                </div>

                <button disabled={isPosting} onClick={() => createPost()}>
                    {
                        isPosting ? 'tweeting...' : 'tweet'
                    }
                </button>

            </div>
        </div>
    )
}

export default NewTweet