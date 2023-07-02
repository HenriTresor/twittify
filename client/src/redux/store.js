import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'
import NotificationsSlice from './Slices/NotificationsSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        Notifications: NotificationsSlice,
    }
})

export default store