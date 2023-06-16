import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import './Messages.css'
import { useLocation } from 'react-router-dom'
import { MessageRounded} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { buttonStyles, iconButtonStyles } from '../../components/Aside/buttonStyles'

const Messages = () => {
  const {pathname} = useLocation()
  return (
    <div
      
      style={{
        width:pathname === '/messages' ? '66%' : ''
      }}
    className='body-container chat-container'
    >
      <div className='contact-list-container'>
        <div className="single-tweet-header"
        style={{justifyContent:'space-between'}}
        >
          <h3>Messages</h3>
          <div>
          <IconButton  color='inherit'>
              <MessageRounded />
          </IconButton>
          </div>
        </div>

        <div className='contact-list'>
          <h1>Welcome to your inbox!</h1>
          <p>Drop a line, share Tweets and more with private conversations between you and others on Twitter. </p>
          <button
          style={{...buttonStyles, color:'white', backgroundColor:'#1d98f0'}}
          >
            Write a message
          </button>
        </div>
     </div>
      <div className='chat-box'>
       <h1>Select a message</h1>
        <p>Choose from your existing conversations, start a new one <br />, or just keep swimming.</p>
        <button
          style={{ ...buttonStyles, color: 'white', backgroundColor: '#1d98f0' }}
        >
          Write a message
        </button> 
     </div>
    </div>
  )
}

export default Messages