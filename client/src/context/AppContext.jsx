import React, { useState, useEffect, createContext } from 'react'

export const AppData = createContext({
    windowSize:window.innerWidth
})
const AppContext = ({ children }) => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

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