import React from 'react';
import { IconButton } from '@mui/material';
import { Home, Explore, Notifications, Person, MessageSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const BottomNav = () => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    return (
        <div className='bottom-nav-container'>
            <IconButton
                onClick={() => navigate('/home')}
                color="info">
                <Home />
            </IconButton>
            <IconButton color="info">
                <Notifications />
            </IconButton>
            <IconButton color="info">
                <MessageSharp />
            </IconButton>
            <IconButton
                onClick={() => navigate(`/${user?.username}`)}
                color="info">
                <Person />
            </IconButton>

        </div>
    );
};


export default BottomNav