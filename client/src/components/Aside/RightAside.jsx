// import React, { useEffect, useState } from 'react'
import './Aside.css'
import {
    Search
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import Person from '../Person'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'
import Error from '../Error'
import { useSelector } from 'react-redux'
import { buttonStyles } from './buttonStyles'
import { findIfFollows } from '../../utils/function'

const RightAside = ({ gettingProfile, setIsOpen, setWhichOpen }) => {

    const { isLoggedIn, user: currentUser } = useSelector(state => state.auth)
    // const [people, setPeople] = useState([])
    const { data, isLoading, error } = useFetch(`${serverLink}/api/v1/users?currentUserId=${'647ee9c92dccdbe82c53328e'}`)
    return (
        <div
            className='aside right-aside'
        >
            {
                gettingProfile ? <Loading />
                    
                    : error.status ? <Error />
                        : (
                    <>
                        <div
                            className='search-box'
                        >
                            <Search />
                            <input type="text" placeholder='Search Twitter' />


                        </div>

                        {
                            isLoggedIn ? (
                                <>

                                    <div className="box">
                                        <Typography variant='h5' fontWeight={'bolder'}>
                                            Who to follow
                                        </Typography>


                                        {
                                            isLoading ? <Loading />
                                                : error.status ? <Error />
                                                    : data?.users?.length === 0 ? 'no new users'
                                                        : data?.users?.map(user => (
                                                            user?._id !== currentUser?._id && !findIfFollows(currentUser, user) ?
                                                                <Person {...user} key={user?._id} />
                                                                : null
                                                        ))
                                        }
                                    </div>
                                </>
                            ) : (
                                <div className="box">
                                    <Typography fontWeight={'bolder'}>
                                        New to Twitter?
                                    </Typography>
                                    <Typography variant='body2' color={'GrayText'} fontSize={12}>
                                        Signup now to get your own personalized timeline!
                                    </Typography>
                                    <button style={buttonStyles}
                                        onClick={() => {
                                            setIsOpen(true)
                                            setWhichOpen('signup')
                                        }}
                                    >
                                        Create account
                                    </button>
                                    <Typography color={'GrayText'}>
                                        By signing up you agree to our terms of service
                                    </Typography>
                                </div>
                            )
                        }
                    </>
                )
            }

        </div>
    )
}

export default RightAside