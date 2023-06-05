import React, {useContext} from 'react'
import './Aside.css'
import {

    Home, Explore,
    Notifications, MessageRounded,
    ListRounded, BookmarkRounded,
    Twitter, PersonRounded, MoreOutlined,Crea
} from '@mui/icons-material'
import {Avatar, Typography, IconButton} from '@mui/material'
import { AppData } from '../../context/AppContext'

const LeftAside = () => {

    const { windowSize} = useContext(AppData)
  return (
      <div
      className='aside left-aside'
      >
          <ul className='nav-items'>
            
              <div style={{margin:'0 0.5em 1em'}}>
                  <Typography>
                      <Twitter />
                    </Typography>
                </div>
              <li>
                  <Home />
                  {windowSize > 600 && "Home"} </li>
              <li>
                  <Explore />
                  { windowSize > 600 && 'Explore'}</li>
              <li>
                  <Notifications />
                  {windowSize > 600 && 'Notifications'} </li>
              <li>
                  <MessageRounded />
                  {windowSize > 600 && 'Messages'} </li>
              <li>
                  <ListRounded />
                  {windowSize > 600 && 'Lists' }</li>
              <li>
                  <BookmarkRounded />
                  {windowSize > 600 &&'Bookmarks'} </li>
              <li>
                  <Twitter />
                  {windowSize > 600 &&'Twitter Blue'}</li>
              <li>
                  <PersonRounded />
                  { windowSize > 600 && 'Profile' }</li>
              <li>
                  <MoreOutlined />
                  { windowSize > 600 &&'More'} </li>
              <button>
                  <FeaturedPlayList />
              </button>
          </ul>
          
          <div
              className='user-profile'
          >
              <Avatar />
              {
                  windowSize > 800 && (
                      <>
                          <div style={{ textAlign: 'left' }}>
                              <Typography >
                                  Henri Tresor
                              </Typography>
                              <Typography variant='body3'>
                                  @tresor_henri_0
                              </Typography>
                          </div>
                          <IconButton color='info'>
                              <MoreOutlined />
                          </IconButton>
                      </>
                  )
             }
          </div>
      </div>
  )
}

export default LeftAside