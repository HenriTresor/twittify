import React, { useEffect } from 'react'
import ComingSoon from '../../components/ComingSoon'
import { useSelector } from 'react-redux'
import Error from '../../components/Error'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

const Notifications = () => {

  const navigate = useNavigate()
  const { notifications } = useSelector(state => state.Notifications)
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    console.log('notifications', notifications)
  },[notifications])
  if (!isLoggedIn) {
    return <Error />
  }
  return (
    <div
      className='body-container'
    >
      <div className="single-tweet-header">
        <div>
          <IconButton color='inherit'
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' fontWeight={'bolder'}>
            Notifications
          </Typography>
        </div>
      </div>

      <div className="notifications-container">
        {
          notifications?.map(notification => (
            <h1>{ notification.notifier}</h1>
          ))
        }
     </div>
    </div>
  )
}

export default Notifications