import React, { useEffect, useState } from 'react'
import './profile.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { Avatar, IconButton, Snackbar, Typography } from '@mui/material'
import { ArrowBack, CalendarMonth } from '@mui/icons-material'
import { buttonStyles } from '../../components/Aside/buttonStyles'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { findIfFollows, followUser, getUser, getUserTweets } from '../../utils/function'
import Post from '../../components/Post'

const Profile = () => {
    const { user: currentUser } = useSelector(state => state.auth)
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [tweetsLoading, setTweetsLoading] = useState(false)
     const [error, setError] = useState({
        status: false,
        message: null
    })
    const [userTweets, setUserTweets] = useState([])

    useEffect(() => {
       
        async function getProfile() {
            setIsLoading(true)
            const data = username && await getUser(username)
            setIsLoading(false)
            if (data?.status) {
              
                setUser(data.user)
                return
            }
            setError({
                status: true,
                message: data?.message
            })
        }
        username !== undefined && getProfile()
    }, [username])


    useEffect(() => {
        let isCancelled = true
        async function getTweets() {
            setTweetsLoading(true)
            const res = await getUserTweets(user?._id)
            setTweetsLoading(false)
            setUserTweets(res?.tweets)
        }
        if (isCancelled) {
            getTweets()
        }
        return () => isCancelled = false
    }, [user?._id])
    return (
        <div
            className='body-container'
        >
            <div className="single-tweet-header">
                <IconButton color='inherit'
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <div>
                    <Typography variant='h6' fontWeight={'bolder'}>
                        {user ? user?.fullName : 'Profile'}
                    </Typography>
                    <Typography color={'GrayText'}>
                        {

                            userTweets?.length !== undefined && (userTweets?.length === 1 && userTweets?.length + ' tweet' || userTweets?.length + ' tweets')
                        }
                    </Typography>
                </div>
            </div>
            {
                isLoading ? <Loading />
                    : error.status
                        ? <Error />
                        : user !== null ? (
                            <>
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
                                        {
                                            currentUser && (
                                                <>
                                                    {
                                                        currentUser?._id === user?._id ? (
                                                            <button
                                                                style={{
                                                                    ...buttonStyles, width: '100px',
                                                                    background: 'none', color: 'white', outline: '1px solid white', padding: '0.7em'
                                                                }}
                                                            >Edit profile
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={async () => {
                                                                    const res = await followUser({
                                                                        followerId: currentUser?._id,
                                                                        followedId: user?._id
                                                                    })
                                                                    setUser(prev => ({
                                                                        ...prev, followers: !findIfFollows(currentUser, user)
                                                                            ? [...prev.followers, currentUser]
                                                                            : prev.followers.filter(follower => follower?._id !== currentUser?._id)
                                                                    }))
                                                                  
                                                                }}
                                                                style={{
                                                                    ...buttonStyles, width: '100px',
                                                                    background: !findIfFollows(currentUser, user) ? 'white' : 'black',
                                                                    color: !findIfFollows(currentUser, user) ? 'black' : 'red',
                                                                    outline: !findIfFollows(currentUser, user) ? '' : '1px solid red',
                                                                    padding: '0.7em'
                                                                }}
                                                            >{
                                                                    findIfFollows(currentUser, user) ? 'unfollow' : 'follow'
                                                                }
                                                            </button>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
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
                                                {user.bio ? user.bio : user.username === currentUser?.username ? `@${currentUser?.username}, add a short bio...` : ''}
                                            </Typography>
                                        </div>
                                        <div className='user-metadata'>
                                            <Typography>
                                                <CalendarMonth /> Joined {moment(user.createdAt).format('MMMM YYYY')}
                                            </Typography>
                                            <div style={{ display: 'flex', marginTop: '1em', alignItems: 'center', gap: '1em' }}>
                                                <Link to={`/${user?.username}/people`}>
                                                    <Typography fontSize={15}>
                                                        {user?.followers?.length} followers
                                                    </Typography>
                                                </Link>
                                                <Link to={`/${user?.username}/people`}>
                                                    <Typography fontSize={15}>
                                                        {user && user?.followees?.length} following
                                                    </Typography>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : ''
            }
            <div
                className='user-activities-container'
            >
                {
                    user && (
                        <>
                            <Typography>
                                {user?.fullName + '\'s recent tweets'}
                            </Typography>
                            {
                                tweetsLoading ? <Loading /> : userTweets?.map((tweet) => (
                                    <Post {...tweet} key={tweet?._id} />
                                ))
                            }
                        </>
                    )
               }
            </div>
        </div>
    )
}

export default Profile