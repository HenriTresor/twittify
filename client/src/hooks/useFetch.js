import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (uri) => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({
        status: false,
        message: '' 
    })

    const fetch = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(uri);
            setIsLoading(false)
            setData(res.data)
        } catch (error) {
            setIsLoading(false)
            setData(null)
            setError({
                status: true,
                message: error.response.data.message
            })
        }
    }
    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            fetch()
        }
        return () => isCancelled = true
    }, [])
    return {
        data, isLoading, error
    }
}

export default useFetch