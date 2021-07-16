import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './authSlice';
import messageAlertReducer from './messageAlertSlice';
export const store = configureStore({
    reducer: {
        auth: loginReducer,
        messageAlert: messageAlertReducer,
    },
});
