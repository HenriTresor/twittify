// import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { Close } from '@mui/icons-material'
import { buttonStyles } from '../Aside/buttonStyles'

const RegModal = ({ isOpen, children, setIsOpen }) => {
    if (!isOpen) {
        return null
    }
    return ReactDOM.createPortal(
        <div className='modal'>
            <button
            style={{...buttonStyles, width:'50px', padding:'0.5em '}}
            onClick={()=>setIsOpen(false)}
            >
                <Close />
            </button>
            {children}
        </div>,
        document.getElementById('reg-modal')
    )
}



export default RegModal