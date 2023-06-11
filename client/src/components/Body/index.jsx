import React, { useState, useEffect } from 'react'
import './Body.css'
import {
<<<<<<< HEAD
    Typography, Avatar, Stack, Box, ListItem, ListItemButton
=======
    Typography, 
>>>>>>> test
} from '@mui/material'

import {
    Twitter
} from '@mui/icons-material'
import Post from '../Post'
import NewTweet from '../NewTweet'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'


const Index = () => {
    const [tweets, setTweets] = useState([])
    const { data, error, isLoading } = useFetch(`${serverLink}/api/v1/tweets`)
=======
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'
import Error from '../Error'
import { useSelector } from 'react-redux'

const Index = () => {
    const [tweets, setTweets] = useState([])
    const { data, isLoading } = useFetch(`${serverLink}/api/v1/tweets`)
    const { isLoggedIn } = useSelector(state => state.auth)
    
>>>>>>> test

    useEffect(() => {
        setTweets(data?.tweets)
    }, [data])
    return (
        <div
            className='body-container'
        >
            <div className='tabs-container'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                    <Typography color={'#1d9bf0'}>
                        <Twitter />
                    </Typography>
                    <Typography fontWeight={"bolder"} fontSize={19} color={'rgb(255,255,255,0.8)'}>
                        Home
                    </Typography>
                </div>
<<<<<<< HEAD
                <div style={{ display: 'flex', marginTop: '2em' }}>
                    <button>For you</button>
                    <button>Following</button>
                </div>
            </div>

            <NewTweet />
=======
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
>>>>>>> test
            {/* <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                _id={'48484848484884'}
                post_content={{ post_text: 'Nice to be back!' }}
            />
            <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                post_content={{ post_text: 'Nice to be back!' }}
            />
            <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                post_content={{ post_text: 'Nice to be back!' }}
            />
            <Post
                author={'henri tresor'}
                author_uname={'tresor_1'}
                posted_on={Date.now()}
                post_content={{ post_text: 'Nice to be back!' }}
            /> */}

            {
                !isLoading ? (
                    tweets?.map(tweet => (
<<<<<<< HEAD
                        <Post {...tweet} />
                    ))
                ) : ('loading...')
=======

                        <Post {...tweet} key={tweet?._id} />

                    ))
                ) : <Loading />
            }
            {
                data === null && <Error />
>>>>>>> test
            }
        </div>
    )
}

<<<<<<< HEAD
export default Index
=======
export default React.memo(Index)
>>>>>>> test
