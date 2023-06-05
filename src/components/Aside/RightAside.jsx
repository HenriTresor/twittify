import React from 'react'
import './Aside.css'
import { 
    Search
} from '@mui/icons-material'

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
      </div>
  )
}

export default RightAside