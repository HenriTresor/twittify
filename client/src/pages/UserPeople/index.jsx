// import React from 'react'
import { Typography } from '@mui/material'
import './UserPeople.css'
import { Twitter } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const UserPeople = () => {

    const { username} = useParams()
    const [currentTab, setCurrentTab] = useState('followers')
    return (
        <div
            className='body-container'
        >

            <div className='tabs-container'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginLeft: '2em' }}>
                    <Typography color={'#1d9bf0'}>
                        <Twitter />
                    </Typography>
                    <Typography fontWeight={"bolder"} fontSize={19} color={'rgb(255,255,255,0.8)'}>
                        {username}
                    </Typography>
                </div>
                <div style={{ display: 'flex', marginTop: '2em' }}>
                    <button
                    onClick={()=>setCurrentTab('followers')}
                    >Followers</button>
                    <button
                        onClick={() => setCurrentTab('following')}
                    >Following</button>
                </div>
            </div>

            <div>
                {
                    currentTab === 'followers' ? (
                    <h4>followers</h4>
                    ) : (
                            <h4>following</h4>
                    )
                }
            </div>
        </div>
    )
}

export default UserPeople