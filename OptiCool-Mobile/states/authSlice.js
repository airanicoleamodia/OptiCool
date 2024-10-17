import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, isLogin: false },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLogin = true
        },
        removeAuth: (state) => {
            state.user = null
            state.token = null
            state.isLogin = false
        }
    }
})

export const { setAuth, removeAuth } = authSlice.actions

export default authSlice.reducer