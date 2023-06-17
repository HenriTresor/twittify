import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import './Messages.css'
import { useLocation } from 'react-router-dom'
import { MessageRounded, Info } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { buttonStyles, iconButtonStyles } from '../../components/Aside/buttonStyles'
import Contact from '../../components/Contact'

const Messages = ({ setIsOpen, setWhichModal, selectedChat, setSelectedChat }) => {
  const { pathname } = useLocation()
  return (
    <div
      style={{
        width: pathname === '/messages' ? '66%' : ''
      }}
      className='body-container chat-container'
    >
      <div className='contact-list-container'>
        <div className="single-tweet-header"
          style={{ justifyContent: 'space-between' }}
        >
          <h3>Messages</h3>
          <div>
            <IconButton
              onClick={() => {
                setIsOpen(true)
                setWhichModal('new-chat')
              }}
              color='inherit'>
              <MessageRounded />
            </IconButton>
          </div>
        </div>
        {
          !selectedChat?._id ? (
            <>
             
              <div className='contact-list'>
                <h1>Welcome to your inbox!</h1>
                <p>Drop a line, share Tweets and more with private conversations between you and others on Twitter. </p>
                <button
                  onClick={() => {
                    setIsOpen(true)
                    setWhichModal('new-chat')
                  }}
                  style={{ ...buttonStyles, color: 'white', backgroundColor: '#1d98f0', width: '200px' }}
                >
                  Write a message
                </button>
              </div>
            </>
          ) : <div className='contact-container'>
              <Avatar />
              <div> 
                <h4>{selectedChat?.fullName}</h4>
                <p>{ '@'+selectedChat?.username }</p>
              </div>
            </div>
       }
      </div>
      <div className='chat-box'>
        {
          !selectedChat?._id ? (
            <>
              <h1>Select a message</h1>
              <p>Choose from your existing conversations, start a new one <br />, or just keep swimming.</p>
              <button
                onClick={() => {
                  setIsOpen(true)
                  setWhichModal('new-chat')
                }}
                style={{ ...buttonStyles, color: 'white', backgroundColor: '#1d98f0', width: '200px' }}
              >
                Write a message
              </button>
            </>
          ) : (
              <>
                <div className="chat-box-header">
                  <h4> {selectedChat.fullName}</h4>
                  <IconButton color='inherit'>
                    <Info />
                  </IconButton>
                </div>
              </>
          )
      }
      </div>
    </div>
  )
}

export default Messages