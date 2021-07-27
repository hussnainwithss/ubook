import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: '',
};

export const messageAlertSlice = createSlice({
    name: 'messageAlert',
    initialState,
    reducers: {
        setMessage: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        clearMessage: (state) => ({
            ...initialState,
        }),
    },
});

export const { setMessage, clearMessage } = messageAlertSlice.actions;
export default messageAlertSlice.reducer;
