import React, { useState } from 'react'
import './Aside.css'
import { 
    Search
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import Person from '../Person'
import useFetch from '../../hooks/useFetch'
import serverLink from '../../utils/server.link'

const RightAside = () => {

    const [people, setPeople] = useState([])
    const { } = useFetch(`${serverLink}/api/v1/users/${4499}`)
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
              none
          </div>
              <div className="box">
                  <Typography variant='h5' fontWeight={'bolder'}>
                      Who to follow
              </Typography>
              
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
              />
              <Person
                  name={'Henri Tresor'}
                  username={'@henri_tresor'}
                  avatar={''}
              />
          </div>
     
      </div>
  )
}

export default RightAside