import React from 'react'
import { Typography } from '@mui/material'
import { RedoRounded } from '@mui/icons-material'
import './Error.css'

const Error = () => {
  return (
      <div className='error-container'>
          <Typography variant='inherit' color='GrayText'>
              Something went wrong. Try reloading
          </Typography>
          <button>
              <RedoRounded />
              Retry</button>
    </div>
  )
}

export default Error