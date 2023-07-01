import React from 'react'
import './Contact.css'
import { Avatar } from '@mui/material'

const Contact = ({ fullName, avatar, username, onClick }) => {
    return (
        <div className='contact-container'
        onClick={onClick}
        >
            <Avatar
            src={avatar}
            />
            <div>
                <h4>{fullName}</h4>
                <p>{username}</p>
            </div>
        </div>
    )
}

export default Contact