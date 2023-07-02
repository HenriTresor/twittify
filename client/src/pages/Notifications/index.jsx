import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Error from '../../components/Error'
import { IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import Notification from '../../components/Notification'

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
            <Notification key={ notification?.notifier} {...notification} />
          ))
        }
     </div>
    </div>
  )
}

export default Notifications