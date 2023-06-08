import React, { useEffect } from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import NotFound from './pages/404/404'
import BottomNav from './components/BottomNav'
import { Homepage } from './pages/Homepage/Homepage'

const App = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home')
    }
  }, [])
  return (
    <>
      <div className='container'>
        <BottomNav />
        <LeftAside />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/:username/status/:postId' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <RightAside />
      </div>
    </>
  )
}

export default App