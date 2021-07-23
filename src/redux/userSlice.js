import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    user: null,
    error: null,
    posts: [],
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
        updateUserPosts: (state, action) => {
            return { ...state, posts: [...state.posts, action.payload] };
        },
    },
});

export const {
    loadUserPending,
    loadUserSuccess,
    loadUserFailed,
    updateUserInfo,
    updateUserPosts,
} = userSlice.actions;

export default userSlice.reducer;
