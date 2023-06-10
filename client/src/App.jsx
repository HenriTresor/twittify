/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useEffect } from 'react'
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


const App = () => {

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
      <BottomNav />
      <LeftAside />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/:username/status/:postId' element={<SingleTweet />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <RightAside />
    </div>
  )
}

export default App