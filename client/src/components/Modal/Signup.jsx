/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { Typography, TextField, Snackbar } from "@mui/material"
import { buttonStyles } from "../Aside/buttonStyles"
import { Google, Twitter } from "@mui/icons-material"
import { useState } from "react"
import axios from "axios"
import serverLink from "../../utils/server.link"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {login } from '../../redux/Slices/AuthSlice'

const Signup = ({ setWhichModal, setIsOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState({
    email: '',
    fullName: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    status: false,
    message: null
  })

  const handleChange = (e) => {
    setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(`${serverLink}/api/v1/users`, inputValues, {

      })
      let data = await res.data
      setIsLoading(false)
      if (!data.status) {
        return setError(prev => ({ status: true, message: data.message }))
      }
      document.cookie = `access_token=${data?.access_token}`
      dispatch(login({user: data?.user}))
      navigate('/home')
      setIsOpen(false)
    } catch (error) {
      setIsLoading(false)
      alert('error occured')
      return setError(prev => ({
        status: true,
        message: error.response?.data.message
      }))
    }
  }
  return (
    <div>
      <Snackbar
        sx={{
          zIndex: 9999999999999999n
        }}
        open={error.status}
        message={error.message}
        onClose={() => setError(prev => ({
          ...prev,
          status: false
        }))}
        autoHideDuration={7000}
      />
      <Typography color={'#1d98f0'} sx={{marginBottom:'1em'}}>
        <Twitter />
      </Typography>
      <Typography variant='h6' letterSpacing={1} fontWeight={'bold'}>
        Create your account on twitter!
      </Typography>
      
      <div>
        {
          inputValues.fullName !== '' && (
            <Typography variant="body2" color={'GrayText'}>
              your
              username will look like this,
              @{inputValues.fullName?.toLowerCase()?.split(' ')?.join('_')} <br/>, you can update it later
            </Typography>
          )
        }
        <div className="input_container">
          <TextField
            //   color='white'
            sx={{ color: 'white' }}
            onChange={(e) => handleChange(e)}
            label='email address'
            value={inputValues.email}
            name="email"
          />
        </div>
        
        <div className="input_container">
          <TextField
            //   color='white'
            value={inputValues.fullName}
            name="fullName"
            onChange={(e) => handleChange(e)}
            sx={{ color: 'white' }}
            label='full name'
          />
         
        </div>
        <div className="input_container">
          <TextField
            //   color='white'
            fullWidth
            value={inputValues.password}
            name="password"
            onChange={(e) => handleChange(e)}
            sx={{ color: 'white' }}
            label='password'
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            style={buttonStyles}>
            Create account
          </button>
        </div>
        <Typography variant='p' fontSize={13} color={'GrayText'}>
          Already have an account? <Typography
            onClick={() => setWhichModal('login')}
            variant='span' color={'#1d98f0'} sx={{ cursor: 'pointer' }}>
            sign in!
          </Typography>
        </Typography>
      </div>
    </div>
  )
}

export default Signup