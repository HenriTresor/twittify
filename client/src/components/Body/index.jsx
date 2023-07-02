import React, { useState, useEffect } from 'react'
import './Body.css'
import {
    Typography,
} from '@mui/material'

import {
    Twitter
} from '@mui/icons-material'
import Post from '../Post'
import NewTweet from '../NewTweet'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'
import Error from '../Error'
import { useSelector } from 'react-redux'

const Body = ({ socket }) => {
    const [tweets, setTweets] = useState([])
    const { data, isLoading } = useFetch(`${serverLink}/api/v1/tweets`)
    const { isLoggedIn } = useSelector(state => state.auth)


    useEffect(() => {
        setTweets(data?.tweets)
    }, [data])
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
                        Home
                    </Typography>
                </div>
                {
                    isLoggedIn && (
                        <>

                            <div style={{ display: 'flex', marginTop: '2em' }}>
                                <button>For you</button>
                                <button>Following</button>
                            </div>
                        </>
                    )
                }
            </div>

            {isLoggedIn && <NewTweet />}

            {
                !isLoading ? (
                    tweets?.map(tweet => (

                        <Post {...tweet} key={tweet?._id} socket={socket} />

                    ))
                ) : <Loading />
            }
            {
                data === null && <Error />
            }
        </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Body)
