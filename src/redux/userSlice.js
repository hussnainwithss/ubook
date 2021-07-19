import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    user: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserPending: (state) => ({
            ...state,
            isLoading: true,
        }),
        loadUserSuccess: (state, action) => ({
            ...state,
            user: action.payload,
        }),
        loadUserFailed: (state) => ({
            ...state,
            isLoading: false,
            error: true,
        }),
        updateUserInfo: (state, action) => ({
            ...state,
            user: action.payload,
        }),
    },
});

export const {
    loadUserPending,
    loadUserSuccess,
    loadUserFailed,
    updateUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
