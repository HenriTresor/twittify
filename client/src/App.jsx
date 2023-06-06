import React, { useEffect } from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'

const Homepage = () => {
  

  return (
    <>
      <LeftAside />
      <Body />
      <RightAside />
    </>
  )
}
const App = () => {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Homepage />}/>
      </Routes>
      </div>
    </>
  )
}

export default App