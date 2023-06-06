import React, { useContext } from 'react'
import './Aside.css'
import {

    Home, Explore,
    Notifications, MessageRounded,
    ListRounded, BookmarkRounded, Add,
    Twitter, PersonRounded, MoreOutlined,
} from '@mui/icons-material'
import { Avatar, Typography, IconButton } from '@mui/material'
import { AppData } from '../../context/AppContext'

const LeftAside = () => {

    const { windowSize } = useContext(AppData)

    if (windowSize) {
        return (
            <div
                className='left-aside aside'
            >
                <ul className='nav-items'>

                    <div>
                        <Typography color={'lightblue'}>
                            <Twitter />
                        </Typography>
                    </div>
                    <li>
                        <Home />
                        <span>Home</span>
                    </li>
                    <li>
                        <Explore />
                        <span>Explore</span></li>
                    <li>
                        <Notifications />
                        <span>Notifications</span> </li>
                    <li>
                        <MessageRounded />
                        <span>Messages</span> </li>
                    <li>
                        <ListRounded />
                        <span>Lists</span></li>
                    <li>
                        <BookmarkRounded />
                        <span>bookmarks</span> </li>
                    <li>
                        <Twitter />
                        <span>Twitter blue</span></li>
                    <li>
                        <PersonRounded />
                        <span>Profile</span></li>
                    <li>
                        <MoreOutlined />
                        <span>More</span> </li>
                    <IconButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em' }}>
                        <Add />

                        {windowSize > 850 && 'Tweet'}
                    </IconButton>
                </ul>

                <div
                    className='user-profile'
                >
                    <Avatar
                   
                    />
                    {
                        windowSize > 850 && (
                            <>
                                <div style={{ textAlign: 'left' }}>
                                    <Typography >
                                       full name
                                    </Typography>
                                    <Typography variant='body3' color={'GrayText'}>
                                        @username
                                    </Typography>
                                </div>
                                <IconButton color='info'>
                                    <MoreOutlined />
                                </IconButton>
                            </>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default LeftAside