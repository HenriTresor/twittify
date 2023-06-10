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

const RightAside = () => {

    // const [people, setPeople] = useState([])
    const { data, isLoading, error } = useFetch(`${serverLink}/api/v1/users?currentUserId=${'647ee9c92dccdbe82c53328e'}`)
    // console.log(data)
  return (
      <div
      className='aside right-aside'
      >
          <div
              className='search-box'
          >
              <Search />
              <input type="text" placeholder='Search Twitter'/>
         
              
          </div>

          <div className='box'>
              <Typography variant='h5' fontWeight={'bolder'}>
                  Trends for you
              </Typography>
              {
                  isLoading ? <Loading />
                      : error.status === null ? <Error />
                          : data?.users?.map(user => (
                              <Person {...user} key={ user?._id} />
                          ))
              }
          </div>
              <div className="box">
                  <Typography variant='h5' fontWeight={'bolder'}>
                      Who to follow
              </Typography>
              
              {/* <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              />
              <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              />
              <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              />
              <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              />
              <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              /> */}

              {
                  isLoading ? <Loading />
                      : error.status === null ? <Error /> 
                          :data?.users?.length === 0 ? 'no new users'
                          : data?.users?.map(user => (
                              <Person {...user} key={ user?._id} />
                          ))
              }
          </div>
     
      </div>
  )
}

export default RightAside