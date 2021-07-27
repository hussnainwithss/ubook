import { loginPending, loginSuccessful, loginFail } from 'redux/authSlice';
import { setMessage } from 'redux/messageAlertSlice';
import { setUserToken } from 'utils/user';
import { registerUser, authenticateUser, setAuthToken } from 'api';

export const userRegistrationHandler = (
    e,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    birthday,
    gender,
    history,
    dispatch
) => {
    e.preventDefault();
    registerUser(
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        birthday,
        gender
    )
        .then((response) => {
            dispatch(loginPending());
            authenticateUser(email, password)
                .then((response) => {
                    setUserToken(response.data.token);
                    setAuthToken(response.data.token);
                    dispatch(loginSuccessful());
                    dispatch(
                        setMessage({
                            message: `Registration Successful! Welcome! ${first_name} ${last_name} `,
                            type: 'success',
                        })
                    );
                    history.push('/dashboard/');
                })
                .catch((errorMsg) => {
                    dispatch(loginFail());
                    dispatch(
                        setMessage({
                            message:
                                'Registration complete! error with login try logging in again',
                            type: 'danger',
                        })
                    );
                });
        })
        .catch((error) => {
            if (error.response) console.log(error.response.data);
        });
};
