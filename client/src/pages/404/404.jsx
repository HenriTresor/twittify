import React from 'react'
import { Typography, Box } from '@mui/material'
import { Twitter } from '@mui/icons-material'

const NotFound = () => {
  return (
      <div
      className='body-container'
      >
          <div
          style={{display:'grid', gap:'4em', placeContent:'center', height:'100dvh', textAlign:'center'}}
          >
              <Box sx={{color:'#1df'}}>
                  <Twitter />
              </Box>
              <Typography variant='h2'>
                  Oops, 404
              </Typography>
              <Typography variant='h5'>
                  Page not found
              </Typography>
         </div>
      </div>
  )
}

export default NotFound