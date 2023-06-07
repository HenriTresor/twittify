import React from 'react'
import './Body.css'
import { 
 Typography,Avatar, Stack, Box , ListItem, ListItemButton, IconButton
} from '@mui/material'

import {
     Twitter, Home, Explore , Notifications , Person, MessageSharp
} from '@mui/icons-material'
import Post from '../Post'
import NewTweet from '../NewTweet'

const BottomNav = () => {
    return (
        <div className='bottom-nav-container'>
            <IconButton color="info">
                <Home />
            </IconButton>
            <IconButton color="info">
                <Explore />
            </IconButton>
            <IconButton color="info">
                <Notifications />
            </IconButton>
            <IconButton color="info">
                <MessageSharp />
            </IconButton>
            <IconButton color="info">
                <Person />
            </IconButton>
           
        </div>
    )
}

const Index = () => {
  return (
      <div
      className='body-container'
      >
          <BottomNav />
          <div className='tabs-container'>
              <div style={{display:'flex', alignItems:'center', gap:'1em'}}>
                  <Typography color={'#1d9bf0'}>
                      <Twitter />
                  </Typography>
              <Typography fontWeight={"bolder"} fontSize={19} color={'rgb(255,255,255,0.8)'}>
                  Home
              </Typography>
              </div>
              <Stack direction={'row'} spacing={12} sx={{ mt: '2em' }}>
                  <ListItem>
                      <ListItemButton>
                          For you
                      </ListItemButton>
                </ListItem>
                  <ListItem>
                     <ListItemButton>
                          Following
                     </ListItemButton>
                </ListItem>
              </Stack>
          </div>
          
          <NewTweet />
          <Post
              author={'henri tresor'}
              author_uname={'@tresor_1'}
              posted_on={Date.now()}
              post_content={{post_text:'Nice to be back!'}}
          />
          <Post
              author={'henri tresor'}
              author_uname={'@tresor_1'}
              posted_on={Date.now()}
              post_content={{post_text:'Nice to be back!'}}
          />
          <Post
              author={'henri tresor'}
              author_uname={'@tresor_1'}
              posted_on={Date.now()}
              post_content={{post_text:'Nice to be back!'}}
          />
          <Post
              author={'henri tresor'}
              author_uname={'@tresor_1'}
              posted_on={Date.now()}
              post_content={{post_text:'Nice to be back!'}}
          />
      </div>
  )
}

export default Index