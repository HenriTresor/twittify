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
import { getCookie, getUserProfile } from './utils/function'
import { login, logout } from './redux/Slices/AuthSlice'
import { useDispatch } from 'react-redux'
import NewTweet from './components/NewTweet'

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
  const dispatch = useDispatch()
  const [gettingProfile, setGettingProfile] = useState(false)

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home')
    }
  }, [])

  // useEffect(() => {
  //   const token = getCookie('access_token')
  //   console.log('token ',token)
  //   if (token) {
  //     dispatch(login({ user: {} }))
  //     setGettingProfile(true)
  //   }
  // },[])
  useEffect(() => {
   let isCancelled = true
    if (isCancelled) {
      const func = async () => {
        setGettingProfile(true)
        const user = await getUserProfile()
        console.log('user', user)
        setGettingProfile(false)
        if (user.status) {
          return dispatch(login({ user: user.user }))
        }
        dispatch(logout())
      }
      func()
    }
   return () => isCancelled = false
  },[])

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
    <LeftAside
        setWhichModal={setWhichModal}
        gettingProfile={gettingProfile}
        setIsOpen={setIsOpen}
      />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' exact element={<Homepage />} />
          <Route path='/:username/status/:postId' element={<SingleTweet />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <RightAside gettingProfile={gettingProfile} />
      <RegModal isOpen={isOpen} setIsOpen={setIsOpen} setWhichModal={setWhichModal}>
        {
          whichModal === 'login'
            ? <Login setWhichModal={setWhichModal} setIsOpen={setIsOpen} />
            : whichModal === 'signup' ? <Signup setWhichModal={setWhichModal} setIsOpen={setIsOpen} />
              : whichModal === 'new-tweet' ? <NewTweet setIsOpen={setIsOpen} /> : ''
        }
      </RegModal>
    </div>
  )
}

export default App