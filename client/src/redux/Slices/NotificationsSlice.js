import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: []
}

const NotificationSlice = createSlice({
    initialState,
    name: 'notifications',
    reducers: {
        addNotification: function (state, action) {
            console.log('state', state, 'action', action)
            state.notifications = [...state.notifications, action.payload]
        }
    }
})

export const { addNotification } = NotificationSlice.actions

export default NotificationSlice.reducer