import React, { useEffect, useState } from 'react'
import './profile.css'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { Avatar, IconButton, Typography } from '@mui/material'
import { ArrowBack, CalendarMonth } from '@mui/icons-material'
import { buttonStyles } from '../../components/Aside/buttonStyles'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { getUserTweets } from '../../utils/function'

const Profile = () => {
    const { user: currentUser } = useSelector(state => state.auth)
    const { username } = useParams()
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const { data, isLoading, error } = useFetch(`${serverLink}/api/v1/users/${username}`)
    const [userTweets, setUserTweets] = useState([])
    useEffect(() => {
        if (data?.status) {
            setUser(data?.user)
        }
    }, [data])

    useEffect(() => {
        let isCancelled = true
        async function getTweets() {
            const res = await getUserTweets(user?._id)
            console.log('user tweets', res)
            setUserTweets(res.tweets)
        }
        getTweets()
        if (isCancelled && user._id) {
        }
        return () => isCancelled = false
    }, [user])
    return (
        <div
            className='body-container'
        >
            {
                isLoading ? <Loading />
                    : error.status
                        ? <Error />
                        : (
                            <>
                                <div className="single-tweet-header">
                                    <IconButton color='inherit'
                                        onClick={() => {
                                            navigate(-1)
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <div>
                                        <Typography variant='h5' fontWeight={'bolder'}>
                                            {user.fullName}
                                        </Typography>
                                        <Typography color={'GrayText'}>
                                            {userTweets?.length || 0} Tweets
                                        </Typography>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3em' }}>
                                    <div className='user-photos-container'>
                                        <div>

                                        </div>
                                        <div>
                                            <Avatar
                                                sx={{ width: '100%', height: '100%' }}
                                                src='d'
                                                sizes='large'
                                                id='user-photo'
                                            />
                                        </div>
                                        <button
                                            style={{ ...buttonStyles, width: 'auto', background: 'none', color: 'white', outline: '1px solid white', padding: '0.7em' }}
                                        >Edit profile</button>
                                    </div>

                                    <div className='user-information'>
                                        <Typography variant='h6' fontWeight={795}>
                                            {user.fullName}
                                        </Typography>
                                        <Typography color={'GrayText'} variant='body2'>
                                            @{user.username}
                                        </Typography>
                                        <div className="user-bio">
                                            <Typography>
                                                {user.bio ? user.bio : user.username === currentUser?.username ? `@${currentUser?.username}, add a short bio about yourself...` : ''}
                                            </Typography>
                                        </div>
                                        <div className='user-metadata'>
                                            <Typography>
                                                <CalendarMonth /> Joined {moment(user.createdAt).format('MMMM YYYY')}
                                            </Typography>
                                            <div style={{ display: 'flex', marginTop: '1em', alignItems: 'center', gap: '1em' }}>
                                                <Typography fontSize={15}>
                                                    {user?.followers?.length} followers
                                                </Typography>
                                                <Typography fontSize={15}>
                                                    {user && user?.followees?.length} following
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
            }
        </div>
    )
}

export default Profile