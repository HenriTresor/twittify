import React, { useEffect } from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
      <Body />
    </>
  )
}

const App = () => {
  return (
    <>
      <div className='container'>
        <LeftAside />
        <Routes>
          <Route path='/home' element={<Homepage />}/>
        </Routes>
        <RightAside />
      </div>
    </>
  )
}

export default App