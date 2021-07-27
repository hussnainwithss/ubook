import { loginPending, loginSuccessful, loginFail } from 'redux/authSlice';
import { setMessage } from 'redux/messageAlertSlice';
import { authenticateUser, setAuthToken } from 'api';
import { setUserToken } from 'utils/user';

export const loginHandler = (
    e,
    userName,
    userPassword,
    rememberMe,
    setNetworkError,
    history,
    dispatch
) => {
    e.preventDefault();
    dispatch(loginPending());
    authenticateUser(userName, userPassword)
        .then((response) => {
            setUserToken(response.data.token, rememberMe);
            setAuthToken(response.data.token);
            dispatch(loginSuccessful());
            dispatch(
                setMessage({
                    message: 'Login Successful',
                    type: 'success',
                })
            );
            history.push('/dashboard/');
        })
        .catch((errorMsg) => {
            dispatch(loginFail());
            if (!errorMsg.response) {
                setNetworkError(true);
                dispatch(
                    setMessage({
                        message: errorMsg.message,
                        type: 'danger',
                    })
                );
            } else if (errorMsg.response.data) {
                dispatch(
                    setMessage({
                        message: errorMsg.response.data.non_field_errors[0],
                        type: 'danger',
                    })
                );
            }
        });
};
