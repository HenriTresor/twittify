import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (uri) => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({
<<<<<<< HEAD
        status: true,
        error: null
=======
        status: false,
        message: '' 
>>>>>>> test
    })

    const fetch = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(uri);
<<<<<<< HEAD
=======
            console.log(res)
>>>>>>> test
            setIsLoading(false)
            setData(res.data)
        } catch (error) {
            setIsLoading(false)
            setData(null)
            setError({
                status: true,
<<<<<<< HEAD
                error
=======
                message: error.response.data.message
>>>>>>> test
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