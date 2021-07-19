import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import {
    loginPending,
    loginSuccessful,
    loginFail,
} from '../../redux/authSlice';
import { setMessage } from '../../redux/messageAlertSlice';

let Login = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [_, setCookie] = useCookies(['authToken']);
    const [networkError, setNetworkError] = useState(false);
    const history = useHistory();
    const { isLoading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    function loginUser(e) {
        e.preventDefault();
        dispatch(loginPending());
        const userLoginCreds = {
            username: userName,
            password: userPassword,
        };
        axios
            .post('http://localhost:8000/api/login/', userLoginCreds)
            .then((response) => {
                let date = new Date();
                const cookies_params = {
                    path: '/',
                    sameSite: 'strict',
                };
                cookies_params['expires'] = rememberMe
                    ? new Date(date.setFullYear(date.getFullYear() + 1))
                    : 0;
                console.log(cookies_params);
                setCookie('authToken', response.data.token, cookies_params);

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
                } else if (errorMsg.response) {
                    dispatch(
                        setMessage({
                            message: errorMsg.response.data.non_field_errors[0],
                            type: 'danger',
                        })
                    );
                }
            });
    }
    return (
        <Form className="nav white-text" onSubmit={loginUser}>
            <Form.Group className="mr-2 mb-0">
                <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    isInvalid={error && !networkError}
                />
                <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    className="login-bottom-text"
                    name="remember-me"
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </Form.Group>
            <Form.Group className="mr-2 mb-0">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setUserPassword(e.target.value)}
                    isInvalid={error && !networkError}
                />
                <Form.Text className="mt-0">
                    <a className="login-bottom-text  white-text " href="/#">
                        Forgot your Password?
                    </a>
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Button variant="success" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </span>
                    ) : (
                        'Login'
                    )}
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Login;
