// import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { Close } from '@mui/icons-material'
import { buttonStyles } from '../Aside/buttonStyles'
import propTypes from 'prop-types'
import { Avatar, Button, Card, CircularProgress, IconButton, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import serverLink from '../../utils/server.link'
import Loading from '../Loading'

const styles = {
    // width: '45dvw'
}

const EditProfile = ({setIsOpen}) => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)
    const [body, setBody] = useState({
        fullName: user?.fullName,
        bio: user?.bio,
        avatar: ''
    })

    useEffect(() => {
        console.log('body', body)
    }, [body])
    const handleChange = (e) => {
        setBody(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleUpdate = async () => {
        setIsUploading(true)
        try {
            const res = await axios.put(`${serverLink}/api/v1/users/${user?._id}`, body,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            const data = await res.data
            setIsUploading(false)
            if (data.status) {
                return location.reload()
            }
        } catch (error) {
            setIsUploading(false)
            alert('error', error.message)
            console.log('error updating body', error)
        }
    }
    return (
        <div style={styles}>
            <div className="single-tweet-header">
                <div>
                    <IconButton color='inherit'
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        <Close />
                    </IconButton>
                    <Typography
                        disabled={isUploading}
                        variant='h6' fontWeight={'bolder'}>
                        Edit
                    </Typography>
                </div>
                <button
                    disabled={isUploading}

                    onClick={() => handleUpdate()}
                    style={{ ...buttonStyles, width: 'auto', borderRadius: '5px' }}>
                    {isUploading ? <CircularProgress size='1.5em' color='inherit'/> : 'save'}
                </button>
            </div>
            <input
                type="file"
                name="avatar"
                id="avatar"
                hidden
                onChange={(e) => {
                    e.target.files[0].type?.split('/')[0] === 'image' ? setBody(prev => ({ ...prev, avatar: e.target.files[0] })) : alert('you have to choose an image file')
                }}
                style={{ display: 'none' }} />
            <label htmlFor="avatar">
                <Card sx={{ padding: '1em', background: body.avatar ? 'grey' : 'none' , color: 'inherit', border: '2px dashed grey', m: '1em 0', cursor: 'pointer' }}>
                    {body?.avatar?.name?.slice(0,20) || "Update profile image"}
                </Card>
            </label>

            {
                body.avatar && (
                    <Button
                    onClick={()=>setBody(prev => ({...prev, avatar:''}))}
                        startIcon={<Close />}>
                        remove
                    </Button>
                )
                }
            <div>
                <div className="input_container">
                    <TextField
                        label='Edit name'
                        placeholder={`${user?.fullName}`}
                        name='fullName'
                        onChange={(e) => handleChange(e)}
                        value={body.fullName}
                    />
                </div>
                <div className="input_container">
                    <TextField
                        label='Edit bio'
                        placeholder={`${user?.bio}`}
                        value={body.bio}
                        name='bio'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditProfile