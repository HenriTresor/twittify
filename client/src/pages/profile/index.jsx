import React, { useEffect, useState } from 'react'
import './profile.css'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { Avatar, IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { buttonStyles } from '../../components/Aside/buttonStyles'

const Profile = () => {
    const { username } = useParams()
    const [user,setUser] = useState({}) 
    const navigate = useNavigate()
    const {data, isLoading,error } = useFetch(`${serverLink}/api/v1/users/${username}`)

    useEffect(() => {
        console.log('data')
        if (data?.status) {
            setUser(data?.user)
        }
    },[data])
   return (
      <div
      className='body-container'
      >
           {
               isLoading ? <Loading />
                   : error.status
                       ? <Error />
                       : (
                           <>
                               <div className="single-tweet-header">
                                   <IconButton color='inherit'
                                       onClick={() => {
                                           navigate(-1)
                                       }}
                                   >
                                       <ArrowBack />
                                   </IconButton>
                                   <Typography variant='h5' fontWeight={'bolder'}>
                                       {user.fullName}
                                   </Typography>
                               </div>
                               <div style={{display:'flex', flexDirection:'column', gap:'3em'}}>
                                   <div className='user-photos-container'>
                                       <div>

                                       </div>
                                       <div>
                                           <Avatar
                                               sx={{ width: '100%', height: '100%' }}
                                               src='d'
                                               sizes='large'
                                               id='user-photo'
                                           />
                                       </div>
                                       <button
                                           style={{ ...buttonStyles, width: 'auto', background: 'none', color: 'white', outline: '1px solid white', padding: '0.7em' }}
                                       >Edit profile</button>
                                   </div>

                                   <div className='user-information'>
                                       <Typography variant='h5' fontWeight={'bolder'}>
                                           {user.fullName}
                                       </Typography>
                                       <Typography color={'GrayText'}>
                                           @{user.username}
                                       </Typography>
                                       <div className="user-bio">
                                           <Typography>
                                               {user.bio}
                                           </Typography>
                                       </div>
                                   </div>
                                  </div>
                           </>
                       )
          }
      </div>
  )
}

export default Profile