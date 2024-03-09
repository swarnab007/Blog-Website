import { createSlice } from "@reduxjs/toolkit";

// initial state of the auth slice
const initialState = {
    status: false,
    user: null,
}

// keep a track if the user is logged in or not
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
