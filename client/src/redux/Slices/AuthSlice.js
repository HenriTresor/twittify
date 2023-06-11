import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null
}
const authSlice = createSlice({
    initialState,
    name:'auth',
    reducers: {
        login: function (state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user
        },
        logout: function (state) {
            state.isLoggedIn = false;
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer