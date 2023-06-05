import React, {useContext} from 'react'
import './Aside.css'
import {

    Home, Explore,
    Notifications, MessageRounded,
    ListRounded, BookmarkRounded,Add,
    Twitter, PersonRounded, MoreOutlined,
} from '@mui/icons-material'
import {Avatar, Typography, IconButton} from '@mui/material'
import { AppData } from '../../context/AppContext'

const LeftAside = () => {

    const { windowSize} = useContext(AppData)
  
    if (windowSize) {
        return (
            <div
                className='aside left-aside'
            >
                <ul className='nav-items'>

                    <div style={{ margin: '0 0.5em 1em' }}>
                        <Typography>
                            <Twitter />
                        </Typography>
                    </div>
                    <li>
                        <Home />
                        {windowSize > 850 && "Home"} </li>
                    <li>
                        <Explore />
                        {windowSize > 850 && 'Explore'}</li>
                    <li>
                        <Notifications />
                        {windowSize > 850 && 'Notifications'} </li>
                    <li>
                        <MessageRounded />
                        {windowSize > 850 && 'Messages'} </li>
                    <li>
                        <ListRounded />
                        {windowSize > 850 && 'Lists'}</li>
                    <li>
                        <BookmarkRounded />
                        {windowSize > 850 && 'Bookmarks'} </li>
                    <li>
                        <Twitter />
                        {windowSize > 850 && 'Twitter Blue'}</li>
                    <li>
                        <PersonRounded />
                        {windowSize > 850 && 'Profile'}</li>
                    <li>
                        <MoreOutlined />
                        {windowSize > 850 && 'More'} </li>
                    <IconButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Add />

                        {windowSize > 850 && 'Tweet'}
                    </IconButton>
                </ul>

                <div
                    className='user-profile'
                >
                    <Avatar />
                    {
                        windowSize > 850 && (
                            <>
                                <div style={{ textAlign: 'left' }}>
                                    <Typography >
                                        Henri Tresor
                                    </Typography>
                                    <Typography variant='body3' color={'GrayText'}>
                                        @tresor_henri_0
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