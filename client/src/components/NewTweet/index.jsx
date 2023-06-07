import React from 'react'
import './NewTweet.css'
import { Avatar, IconButton, TextField } from '@mui/material'
import { Photo, GifBoxOutlined, Poll, EmojiEmotions, CalendarToday, LocationOn } from '@mui/icons-material'

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
}

export default NewTweet