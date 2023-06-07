import React from 'react'
import './Aside.css'
import { 
    Search
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import Person from '../Person'

const RightAside = () => {
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