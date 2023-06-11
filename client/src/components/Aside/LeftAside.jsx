import React, { useContext, useEffect } from 'react'
import './Aside.css'
import {

    Home, Explore,
    Notifications, MessageRounded,
    ListRounded, BookmarkRounded, Add,
    Twitter, PersonRounded, MoreHoriz,
} from '@mui/icons-material'
import { Avatar, Typography, IconButton } from '@mui/material'
import { AppData } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LeftAside = () => {

    const {isLoggedIn} = useSelector(state => state.auth)
    const { windowSize } = useContext(AppData)

    if (windowSize) {
        return (
            <div
                className='left-aside aside'
            >
                <ul className='nav-items'>

                   
                    <Link to='/home'>
                        <li>
                            <Home />
                            <span>Home</span>
                        </li>
                    </Link>
                    <li>
                        <Explore />
                        <span>Explore</span></li>
                    {
                        isLoggedIn && (
                            <>
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
                                    <MoreHoriz />
                                    <span>More</span> </li>
                                <IconButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em' }}>
                                    <Add />

                                    {windowSize > 930 && 'Tweet'}
                                </IconButton>
                            </>
                        )
                   }
                </ul>

                {
                    isLoggedIn && (
                        <div
                            className='user-profile'
                        >

                            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1em' }}>
                                <Avatar
                                />
                                <div>
                                    <Typography >
                                        full name
                                    </Typography>
                                    <Typography variant='body3' color={'GrayText'}>
                                        @username
                                    </Typography>
                                </div>
                            </div>
                            <div>
                                <IconButton color='info'>
                                    <MoreHoriz />
                                </IconButton>
                            </div>
                        </div>
                    )
              }
            </div>
        )
    }
}

export default LeftAside