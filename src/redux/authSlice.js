import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    error: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginPending: (state) => ({
            ...state,
            isLoading: true,
        }),
        loginSuccessful: (state) => ({
            ...state,
            isAuthenticated: true,
            isLoading: false,
        }),
        loginFail: (state) => ({
            ...state,
            error: true,
            isLoading: false,
        }),
        logoutPending: (state) => ({
            ...state,
            isLoading: true,
        }),
        logoutSuccessful: (state) => ({
            ...initialState,
        }),
        logoutFail: (state) => ({
            ...state,
            error: true,
        }),
    },
});

// Action creators are generated for each case reducer function
export const {
    loginPending,
    loginSuccessful,
    loginFail,
    logoutPending,
    logoutSuccessful,
    logoutFail,
} = authSlice.actions;

export default authSlice.reducer;
