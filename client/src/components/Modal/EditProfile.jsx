// import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import {  Close, CameraEnhanceRounded } from '@mui/icons-material'
import { buttonStyles } from '../Aside/buttonStyles'
import propTypes from 'prop-types'
import { Avatar, IconButton, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const styles = {
    width:'45dvw'
}

const EditProfile = () => {
    const { user} = useSelector(state => state.auth)
    const navigate = useNavigate()
  return (
      <div style={styles}>
          <div className="single-tweet-header">
              <div>
                  <IconButton color='inherit'
                      onClick={() => {
                          navigate(-1)
                      }}
                  >
                      <Close />
                  </IconButton>
                  <Typography variant='h6' fontWeight={'bolder'}>
                      Edit profile
                  </Typography>
              </div>
              <button style={{...buttonStyles, width:'auto '}}>
                  Save
              </button>
          </div>
          <div className='user-photos-container'>
            
              <div style={{display:'grid', placeContent:'center'}}>
                      <Avatar
                          src='d'
                          sx={{ width: '100px', height: '100px' }}
                          id='user-photo'
                      />
              </div>
          </div>
          <div>
              <div className="input_container">
                  <TextField
                      label='Edit name'
                      placeholder={`${user?.fullName}`}
                  />
              </div>
              <div className="input_container">
                  <TextField
                      label='Edit bio'
                      placeholder={`${user?.bio}`}
                  />
             </div>
          </div>
          </div>
  )
}

export default EditProfile