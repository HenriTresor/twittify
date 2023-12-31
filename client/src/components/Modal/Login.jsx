/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { Typography, TextField, Snackbar, CircularProgress } from "@mui/material"
import { buttonStyles } from "../Aside/buttonStyles"
import { Google, Twitter } from "@mui/icons-material"
import { useState } from "react"
import axios from "axios"
import serverLink from "../../utils/server.link"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from '../../redux/Slices/AuthSlice'
import { useLocation } from "react-router-dom"
import LoginBlurry from "../LoadingBlurry"

const Login = ({ setWhichModal, setIsOpen }) => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    status: false,
    message: null
  })

  const handleChange = (e) => {
    setInputValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(`${serverLink}/api/v1/auth/login`, inputValues, {

      })

      let data = await res.data
      setIsLoading(false)
      if (!data.status) {
        return setError(prev => ({
          status: true,
          message: data.message
        }))
      }
      document.cookie = `access_token=${data?.access_token}`
      dispatch(login({ user: data?.user }))
      navigate(`${pathname}`)
      setIsOpen(false)
    } catch (error) {
      setIsLoading(false)
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
        onClose={() => setError(prev => ({ ...prev, status: false }))}
        autoHideDuration={7000}
      />
      <Typography color={'#1d98f0'} sx={{ marginBottom: '1em' }}>
        <Twitter />
      </Typography>
      <Typography variant='h6' letterSpacing={1} fontWeight={'bold'}>
        Signin to Twitter
      </Typography>



      <div>
        <div className="input_container">
          <TextField
            //   color='white'
            sx={{ color: 'white' }}
            onChange={(e) => handleChange(e)}
            label='email address or username'
            name="email"
            type="text"
            value={inputValues.email}
          />
        </div>
        <div className="input_container">
          <TextField
            //   color='white'
            fullWidth
            onChange={(e) => handleChange(e)}
            sx={{ color: 'white' }}
            name="password"
            type='password'
            value={inputValues.password}
            label='password'
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={buttonStyles}>
            {isLoading ? <CircularProgress size={'1em'}/> : 'Sign in'}
          </button>
        </div>
        <Typography variant='p' fontSize={13} color={'GrayText'}>
          Don&apos;t have an account yet? <Typography
            onClick={() => setWhichModal('signup')}
            variant='span' color={'#1d98f0'} sx={{ cursor: 'pointer' }}>
            create one!
          </Typography>
        </Typography>
      </div>
    </div>
  )
}

export default Login