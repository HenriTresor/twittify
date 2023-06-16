import React, { useContext, useEffect, useState } from 'react'
import './Aside.css'
import Tooltip from '../Tooltip'

import {

    Home, Explore,
    Notifications, MessageRounded,
    ListRounded, BookmarkRounded, Add,
    Twitter, PersonRounded, MoreHoriz,
} from '@mui/icons-material'
import { Avatar, Typography, IconButton } from '@mui/material'
import { AppData } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../Loading'

const LeftAside = ({ gettingProfile, setWhichModal, setIsOpen }) => {

    const { isLoggedIn, user } = useSelector(state => state.auth)
    const { windowSize } = useContext(AppData)
    const [isToolTipOpen, setIsToolTipOpen] = useState(false)
    const navigate = useNavigate()

    if (windowSize) {
        return (
            <div
                className='left-aside aside'
            >
                {isToolTipOpen && <Tooltip />}
                    {
                    gettingProfile ? <Loading /> : (
                        <>
                            <ul className='nav-items'>


                                <Link to='/home'>
                                    <li>
                                        <Home />
                                        <span>Home</span>
                                    </li>
                                </Link>
                                {
                                    isLoggedIn && (
                                        <>
                                            <li
                                            onClick={()=>navigate('/notifications')}
                                            >
                                                <Notifications />
                                                <span>Notifications</span> </li>
                                            <li
                                            
                                                onClick={() => navigate('/messages')}>
                                                <MessageRounded />
                                                <span>Messages</span> </li>
                                            <li>
                                                <BookmarkRounded />
                                                <span>bookmarks</span> </li>
                                          
                                            <Link to={`/${user?.username}`}>
                                                <li>
                                                    <PersonRounded />
                                                    <span>Profile</span></li>
                                            </Link>
                                            <li>
                                                <MoreHoriz />
                                                <span>More</span> </li>
                                            <IconButton
                                                onClick={() => {
                                                    setIsOpen(true)
                                                    setWhichModal('new-tweet')
                                            }}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em' }}>
                                                <Add />

                                                {windowSize > 930 && 'Tweet'}
                                            </IconButton>
                                        </>
                                    )
                                }
                            </ul>

                            {
                                isLoggedIn && (
                                    gettingProfile ? <Loading /> : (
                                        <div
                                            onClick={() => {
                                                setIsToolTipOpen(!isToolTipOpen);
                                            }}
                                            className='user-profile'
                                        >

                                            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1em' }}>
                                                <Avatar
                                                />
                                                <div>
                                                    <Typography >
                                                        {user?.fullName}
                                                    </Typography>
                                                    <Typography variant='body3' color={'GrayText'}>
                                                        @{user?.username}
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
                                )
                            }
                        </>
                    )
               }
            </div>
        )
    }
}

export default LeftAside