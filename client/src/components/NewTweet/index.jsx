<<<<<<< HEAD
import React from 'react'
import { Avatar, IconButton, TextField } from '@mui/material'
import { Photo, GifBoxOutlined, Poll, EmojiEmotions, CalendarToday, LocationOn } from '@mui/icons-material'
import '../../NewTweet.css'

const NewTweet = () => {
  return (
      <div
      className='new-tweet-container'
      >
          <div>
              <Avatar />
              <textarea
                 
                  placeholder='What is happening?!'
                    
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
                  <IconButton color='info'>
                      <EmojiEmotions />
                  </IconButton>
                  <IconButton color='info'>
                      <CalendarToday />
                  </IconButton>
                  <IconButton color='info'>
                      <LocationOn />
                  </IconButton>
              </div>
              <button>
                  Tweet
              </button>
          </div>
      </div>
  )
=======
import React, { useState } from 'react'
import { Avatar, IconButton, TextField, CircularProgress } from '@mui/material'
import { Photo, GifBoxOutlined, Poll, EmojiEmotions, CalendarToday, LocationOn } from '@mui/icons-material'
import '../../NewTweet.css'
import axios from 'axios'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'

const NewTweet = () => {

    let [post_content, setPost_content] = useState({
        post_text: '',
        post_image: ''
    })
    const navigate = useNavigate()
    let [isPosting, setIsPosting] = useState(false)
    const createPost = async () => {
        setIsPosting(true)
        try {
            let tweet = {
                author: '6482d847038cc4982fde6df4',
                post_content,
                type: 'actual-tweet'
            }

            const res = await axios.post(`${serverLink}/api/v1/tweets`, tweet)
            setIsPosting(false)
            console.log('tweetin response',res)
            if (res.data.status) {
                navigate(`/${res.data.newTweet.author?.username}/status/${res.data.newTweet._id}`)
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
            <div>
                <Avatar />
                <textarea

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
                    <IconButton color='info'>
                        <EmojiEmotions />
                    </IconButton>
                    <IconButton color='info'>
                        <CalendarToday />
                    </IconButton>
                    <IconButton color='info'>
                        <LocationOn />
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
>>>>>>> test
}

export default NewTweet