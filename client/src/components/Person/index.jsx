import React, { useState } from 'react'
import './Person.css'
import { Avatar, Typography, IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'
import { AppData } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { followUser } from '../../utils/function'
import { useSelector } from 'react-redux'

const Person = ({ fullName, username, avatar, _id }) => {

    const { user: currentUser } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [followed, setFollowed] = useState(false)
    const { windowSize } = React.useContext(AppData)
    return (
        <div className='person-container'>
            <div
                onClick={() => {
                    navigate(`/${username}`)
                }}
                style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: 2 }}>
                <Avatar sizes='small' src={avatar} />
                <div>
                    <Typography variant='body2'>
                        {fullName}
                    </Typography>
                    <Typography variant='body2' color={'grayText'}>
                        {username}
                    </Typography>
                </div>
            </div>

            {
                windowSize && windowSize < 960 ? (
                    <IconButton>
                        <Add />
                    </IconButton>
                ) : (

                        <button
                            style={{
                                backgroundColor: followed && 'rgb(0,0,0,0.3)',
                                color: followed && 'white',
                                outline: followed && '1px solid white'
                            }}
                        onClick={async () => {
                            const res = await followUser({
                                followerId: currentUser?._id,
                                followedId: _id
                            })
                            setFollowed(!followed)
                        }}
                    >
                        {
                            followed ? 'following!' : 'follow'
                        }
                    </button>
                )
            }
        </div>
    )
}

export default Person