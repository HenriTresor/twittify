import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import { useSelector } from 'react-redux'
import Error from '../../components/Error'

const Notifications = () => {

  const { isLoggedIn } = useSelector(state => state.auth)

  if (!isLoggedIn) {
    return <Error />
  }
  return (
    <div
      className='body-container'
    >
      <h4>Notifications page</h4>
          <ComingSoon />
    </div>
  )
}

export default Notifications