import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const NotificationSlice = createSlice({
    initialState,
    name: 'notifications',
    reducers: {
        addNotification: function (state, action) {
            state = [...state, action.payload]
        }
    }
})

export const { addNotification } = NotificationSlice.actions

export default NotificationSlice.reducer