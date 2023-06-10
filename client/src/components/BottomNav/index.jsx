import React from 'react';
import { IconButton } from '@mui/material';
import { Home, Explore, Notifications, Person, MessageSharp } from '@mui/icons-material';


const BottomNav = () => {
    return (
        <div className='bottom-nav-container'>
            <IconButton color="info">
                <Home />
            </IconButton>
            <IconButton color="info">
                <Explore />
            </IconButton>
            <IconButton color="info">
                <Notifications />
            </IconButton>
            <IconButton color="info">
                <MessageSharp />
            </IconButton>
            <IconButton color="info">
                <Person />
            </IconButton>

        </div>
    );
};


export default BottomNav