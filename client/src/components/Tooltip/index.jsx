// import React from 'react'
import ReactDOM from 'react-dom'
import './Tooltip.css'

const Tooltip = ({children}) => {
  return ReactDOM.createPortal(
    <div className='tooltip-container'>
     {children}
    </div>, document.getElementById('tooltip'))
}

export default Tooltip