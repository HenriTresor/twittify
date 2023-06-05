import React, { useState, useEffect, createContext } from 'react'

export const AppData = createContext(null)
const AppContext = ({ children }) => {

    const [windowSize, setWindowSize] = useState(0);

    const handleWindowSizeChange = (e) => {
        console.log('window size', window.innerWidth)
        setWindowSize(() => {
            return window.innerWidth
        })
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)

        return () => window.removeEventListener('resize', handleWindowSizeChange)
    }, [])

    const values = {
        windowSize
    }
    return (
        <AppData.Provider value={values}>
            {children}
        </AppData.Provider>
    )
}

export default AppContext