// import React from 'react'
import { Typography } from '@mui/material'
import './UserPeople.css'
import { Twitter } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const UserPeople = () => {

    const { username } = useParams()
    const [currentTab, setCurrentTab] = useState('followers')
    const { isLoading, error, data } = useFetch(`${serverLink}/api/v1/users/${username}`)
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
                        onClick={() => setCurrentTab('followers')}
                    >Followers</button>
                    <button
                        onClick={() => setCurrentTab('following')}
                    >Following</button>
                </div>
            </div>

            <div>
                {
                    currentTab === 'followers' ? (
                        isLoading ? <Loading />
                            : error.status ? <Error />
                                : (
                                    <h1>followers</h1>
                            )
                    ) : (
                            isLoading ? <Loading />
                                : error.status ? <Error />
                                    : (
                                <h1>following</h1>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default UserPeople