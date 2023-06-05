import React from 'react'
import './Person.css'
import {Avatar, Typography, IconButton}  from '@mui/material'
import {Add } from '@mui/icons-material'
import { AppData } from '../../context/AppContext'

const Person = ({ name, username, avatar }) => {
    
    const { windowSize} = React.useContext(AppData)
  return (
      <div className='person-container'>
          <div style={{display:'flex', alignItems:'center', gap:2}}>
          <Avatar sizes='small' />
              <div>
                  <Typography variant='body2'> 
                      {name}
                  </Typography>
                  <Typography variant='body2' color={'grayText'}>
                      {username}
                  </Typography>
              </div>
          </div>

          {
              windowSize && windowSize < 960 ? (
                  <IconButton>
                      <Add />
              </IconButton>
              ) : (
                      
                      <button>
                          follow
                      </button>
              )
        }
    </div>
  )
}

export default Person