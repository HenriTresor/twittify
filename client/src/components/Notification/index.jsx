// import React from 'react'
import { Avatar } from '@mui/material'
import './Notification.css'

const Notification = ({ notifier, message }) => {
    return (
        <div className='notification-container'>
            <div>
                <Avatar />
                <h3>{notifier}</h3>
            </div>
            <div>
                {message}
            </div>
        </div>
    )
}

export default Notification