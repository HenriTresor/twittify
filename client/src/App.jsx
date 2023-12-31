/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useEffect, useState, useRef } from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Loading from './components/Loading'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Fab, Typography } from '@mui/material'
import RegModal from './components/Modal'
import Login from './components/Modal/Login'
import Signup from './components/Modal/Signup'
import { getCookie, getUserProfile } from './utils/function'
import { login, logout } from './redux/Slices/AuthSlice'
import { useDispatch } from 'react-redux'
import NewTweet from './components/NewTweet'
import Profile from './pages/profile'
import { Add } from '@mui/icons-material'
import NewChat from './components/NewChat'
import serverLink from './utils/server.link'
import UserPeople from './pages/UserPeople'
import EditProfile from './components/Modal/EditProfile'
import { addNotification } from './redux/Slices/NotificationsSlice'
import { io } from 'socket.io-client'


const Homepage = lazy(() => import('./pages/Homepage'))
const NotFound = lazy(() => import('./pages/404/404'))
const SingleTweet = lazy(() => import('./pages/SingleTweet'))
const Messages = lazy(() => import('./pages/Messages'))
const Notifications = lazy(() => import('./pages/Notifications'))

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
  cursor: 'pointer'
}

const App = () => {

  let socket = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [whichModal, setWhichModal] = useState('login')
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const { notifications } = useSelector(state => state.Notifications)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [gettingProfile, setGettingProfile] = useState(false)
  const [selectedChat, setSelectedChat] = useState({})

  useEffect(() => {
    if (isLoggedIn) {
      socket.current = io(`${serverLink}`)
    }
  }, [isLoggedIn, user])
  useEffect(() => {
    !localStorage.getItem('notifications') && localStorage.setItem('notifications', JSON.stringify([]))
  }, [])
  useEffect(() => {
    const localNotifications = JSON.parse(localStorage.getItem('notifications'))

    localNotifications !== [] && (
      localNotifications.forEach((notification) => {
        dispatch(addNotification({ ...notification }))
      })
    )
  }, [])
  useEffect(() => {
    if (pathname === '/') {
      navigate('/home')
    }
  }, [])
  useEffect(() => {
    if (socket && isLoggedIn) {
      socket.current.emit('add user', user)
    }
  }, [socket, user, isLoggedIn])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('new like', (tweet, liker) => {
        // console.log(tweet, liker)
        const message = `${liker?.fullName} liked you tweet: ${tweet?.post_content?.post_text?.slice(0, 200)}`
        dispatch(addNotification({ notifier: liker, message, read: false, createdAt: new Date(Date.now()) }))

        localStorage.setItem('notifications', JSON.stringify([...JSON.parse(localStorage.getItem('notifications')), { notifier: liker, message, read: false }]))
      })
    }
  }, [socket.current])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('new comment', (tweet, commentor, reply) => {

        console.log('reply', reply)
        const message = `${commentor?.fullName} commented on your tweet: ${reply?.reply_content.reply_text}`
        dispatch(addNotification({ notifier: commentor, message, read: false, createdAt: new Date(Date.now()) }))
        localStorage.setItem('notifications', JSON.stringify([...JSON.parse(localStorage.getItem('notifications')), { notifier: commentor, message, read: false }]))
      })
    }
  }, [socket.current])
  useEffect(() => {
    let isCancelled = true
    if (isCancelled) {
      const func = async () => {
        try {
          setGettingProfile(true)
          const user = await getUserProfile()
          setGettingProfile(false)
          if (user.status) {
            return dispatch(login({ user: user.user }))
          }
          dispatch(logout())
        } catch (error) {
          setGettingProfile(false)
          console.log(error)
        }
      }
      func()
    }
    return () => isCancelled = false
  }, [])

  return (
    <div className='container'>
      {
        isLoggedIn && (
          <Fab
            id='fab'
            onClick={() => {
              setIsOpen(true)
              setWhichModal('new-tweet')
            }}
            placeholder='gg'
            color='info'
            size=''
            variant='circular'
            sx={{ position: 'fixed', bottom: '6em', right: '1em' }}

          >
            <Add />
          </Fab>
        )
      }
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
              padding: '0.7em', zIndex: '99999', alignContent: 'center',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
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
                  color: 'white', marginBottom: 22
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
          <Route path='/' element={<Homepage socket={socket} />} />
          <Route path='/home' exact element={<Homepage socket={socket} />} />
          <Route path='/:username'>
            <Route index element={<Profile
              setIsOpen={setIsOpen}
              setWhichModal={setWhichModal}
            />} />
            <Route path='people' element={<UserPeople />} />
          </Route>
          <Route path='/messages' exact element={<Messages
            setIsOpen={setIsOpen}
            setWhichModal={setWhichModal}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />} />
          <Route path='/notifications' exact element={<Notifications />} />
          <Route path='/:username/status/:postId' element={<SingleTweet socket={socket} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {
        pathname !== '/messages' && (
          <RightAside gettingProfile={gettingProfile}
            setIsOpen={setIsOpen} setWhichModal={setWhichModal}
          />
        )
      }
      <RegModal isOpen={isOpen} setIsOpen={setIsOpen} setWhichModal={setWhichModal}>
        {
          whichModal === 'login'
            ? <Login setWhichModal={setWhichModal} setIsOpen={setIsOpen} />
            : whichModal === 'signup' ? <Signup setWhichModal={setWhichModal} setIsOpen={setIsOpen} />
              : whichModal === 'new-chat' ? <NewChat
                setIsOpen={setIsOpen}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
                : whichModal === 'edit-profile' ? <EditProfile
                  setIsOpen={setIsOpen}
                />
                  : whichModal === 'new-tweet' ? <NewTweet setIsOpen={setIsOpen} /> : ''
        }
      </RegModal>
    </div>
  )
}

export default App