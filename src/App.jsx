import React from 'react'
import './App.css'
import LeftAside from './components/Aside/LeftAside'
import RightAside from './components/Aside/RightAside'
import Body from './components/Body'

const App = () => {
  return (
    <div className='container'>
      <LeftAside />
      <Body />
      <RightAside />
    </div>
  )
}

export default App