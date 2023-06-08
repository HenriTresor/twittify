import React, { useState, useEffect } from 'react'
import './Body.css'
import {
    Typography, Avatar, Stack, Box, ListItem, ListItemButton
} from '@mui/material'

import {
    Twitter
} from '@mui/icons-material'
import Post from '../Post'
import NewTweet from '../NewTweet'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'


const Index = () => {
    const [tweets, setTweets] = useState([])
    const { data, error, isLoading } = useFetch(`${serverLink}/api/v1/tweets`)

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
                <div style={{ display: 'flex', marginTop: '2em' }}>
                    <button>For you</button>
                    <button>Following</button>
                </div>
            </div>

            <NewTweet />
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
                        <Post {...tweet} />
                    ))
                ) : ('loading...')
            }
        </div>
    )
}

export default Index