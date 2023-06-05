import React from 'react'
import './Body.css'
import { 
 Typography,Avatar, Stack, Box , ListItem, ListItemButton
} from '@mui/material'

import {
     
} from '@mui/icons-material'
import Post from '../Post'

const Index = () => {
  return (
      <div
      className='body-container'
      >
          <div className='tabs-container'>
              <Typography fontWeight={"bolder"} fontSize={19} color={'rgb(255,255,255,0.8)'}>
                  Home
              </Typography>
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