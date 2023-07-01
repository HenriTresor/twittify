// import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import {  Close } from '@mui/icons-material'
import { buttonStyles } from '../Aside/buttonStyles'
import propTypes from 'prop-types'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const styles = {
    width:'45dvw'
}

const EditProfile = () => {
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
    </div>
  )
}

export default EditProfile