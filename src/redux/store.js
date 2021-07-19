import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './authSlice';
import messageAlertReducer from './messageAlertSlice';
import userReducer from './userSlice';
export const store = configureStore({
    reducer: {
        auth: loginReducer,
        messageAlert: messageAlertReducer,
        user: userReducer,
    },
});
