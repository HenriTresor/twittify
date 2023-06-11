/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Loading from './components/Loading'
import axios from 'axios'
import serverLink from './utils/server.link'
// import Homepage from './pages/Homepage/Homepage'
// import NotFound from './pages/404/404'
// import SingleTweet from './pages/SingleTweet'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import RegModal from './components/Modal'
import Login from './components/Modal/Login'
import Signup from './components/Modal/Signup'

const Homepage = lazy(() => import('./pages/Homepage'))
const NotFound = lazy(() => import('./pages/404/404'))
const SingleTweet = lazy(() => import('./pages/SingleTweet'))

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your backend server URL
  withCredentials: true, // Enable sending cookies and CORS headers
});

// Set CORS headers
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosInstance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

const buttonStyles = {
  padding: '0.4em 1em',
  fontWeight: "bold",
  margin: '0 0.4em',
  borderRadius: '1em',
  border: 'none',
  cursor:'pointer'
}

const App = () => {

  const [isOpen, setIsOpen ] = useState(false)
  const [whichModal, setWhichModal] = useState('login')
  const { isLoggedIn } = useSelector(state => state.auth)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home')
    }
  }, [])

  useEffect(() => {
    async function requestLogin() {
      try {
        const res = await axiosInstance.get(`${serverLink}/api/v1/auth/google`, {

        })
        // const data = await res.json();
        console.log('user profile', res)
      } catch (error) {
        console.log('error requesting login', error.stack)
      }
    }

    requestLogin()
  }, [])
  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const res = await axios.get(`${serverLink}/api/v1/auth/profile`)
  //       console.log('user profile', res.data)
  //     } catch (error) {
  //       console.log('error fetching user:', error.message)
  //     }
  //   }

  //   getUser()
  // }, [])
  return (
    <div className='container'>
      {
        !isLoggedIn && (
          <div
            style={{
              position: 'fixed',
              bottom: '0',
              width: '100%',
              left: '0',
              backgroundColor: '#1d98f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              padding: '1em'
            }}
          >
            <div>
              <Typography variant='h6' fontWeight={'bolder'}>
                Don&apos;t miss what&apos;s happening
              </Typography>
              <Typography variant='body2'>
                People on Twitter are the first to know
              </Typography>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsOpen(true)
                  setWhichModal('login')
                }}
                style={{
                  ...buttonStyles,
                  background: 'none',
                  border: '1px solid white',
                  color:'white'
                }}>
                login
              </button>
              <button
                onClick={() => {
                  setIsOpen(true)
                  setWhichModal('signup')
                }}
                style={buttonStyles}
              >
                signup
              </button>
            </div>
          </div>
        )
      }
      <BottomNav />
      <LeftAside />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' exact element={<Homepage />} />
          <Route path='/:username/status/:postId' element={<SingleTweet />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <RightAside />
      <RegModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {
          whichModal === 'login' ? <Login /> : <Signup />
        }
      </RegModal>
    </div>
  )
}

export default App