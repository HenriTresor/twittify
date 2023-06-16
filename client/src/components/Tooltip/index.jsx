// import React from 'react'
import ReactDOM from 'react-dom'
import './Tooltip.css'

const Tooltip = () => {
  return ReactDOM.createPortal(
    <div className='tooltip-container'>
      <button>
        logout
      </button>
    </div>, document.getElementById('tooltip'))
}

export default Tooltip