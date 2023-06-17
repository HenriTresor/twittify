import React, { useEffect, useState } from 'react'
import './NewChat.css'
import { buttonStyles } from '../Aside/buttonStyles'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import serverLink from '../../utils/server.link'
import { getUsersByQuery } from '../../utils/function'
import Contact from '../Contact'
import Loading from '../Loading'

const NewChat = () => {

    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const [selectedChat, setSelectedChat] = useState({})
    const getResults = async (q) => {
        setLoading(true)
        const data = await getUsersByQuery(q)
        setLoading(false)
        setResult(data.users)
    }
    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            getResults(query)
        }
        return () => isCancelled = true
    }, [query])
    return (
        <div className='new-chat-container'>
            <div className="single-tweet-header">
                <h3>New message</h3>
                <button
                    disabled={!selectedChat._id}
                    style={{ ...buttonStyles, width: '100px', padding: '0.6em' }}
                >
                    next
                </button>
            </div>
            <div className='search-container'>
                <Search />
                <input type="search"
                    autoComplete='off'
                    placeholder='Search people'
                    name="query" id="query" onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="search-results">
                {
                  
                    !loading ? result?.map((res) => (
                       <>
                            <Contact {...res} key={res._id}
                                onClick={() => setSelectedChat(res)}
                            />
                           
                        </>
                    )) : <Loading />
                }
            </div>
        </div>
    )
}

export default NewChat