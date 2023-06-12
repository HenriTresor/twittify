import React from 'react'
import './Person.css'
import {Avatar, Typography, IconButton}  from '@mui/material'
import {Add } from '@mui/icons-material'
import { AppData } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Person = ({ fullName, username, avatar }) => {
    
    const navigate = useNavigate()
    const { windowSize} = React.useContext(AppData)
  return (
      <div className='person-container'>
          <div
              onClick={() => {
                  navigate(`/${username}`)
              }}
              style={{ display: 'flex', cursor:'pointer', alignItems: 'center', gap: 2 }}>
              <Avatar sizes='small' src={avatar} />
              <div>
                  <Typography variant='body2'> 
                      {fullName}
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