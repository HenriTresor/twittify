import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../components/Error'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import Notification from '../../components/Notification'
import { addNotification } from '../../redux/Slices/NotificationsSlice'

const Notifications = () => {

  const navigate = useNavigate()
  let { notifications } = useSelector(state => state.Notifications)
  const { isLoggedIn } = useSelector(state => state.auth)

  notifications = notifications.map((notification) => {
    return { ...notification, read: true }
  })
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
            <Notification key={notification?.message} {...notification} />
          ))
        }
      </div>
    </div>
  )
}

export default Notifications