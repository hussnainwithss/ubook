import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Form, Spinner } from 'react-bootstrap';
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
    const history = useHistory();
    const { isLoading, isAuthenticated, error } = useSelector(
        (state) => state.auth
    );
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
                sessionStorage.setItem('token', response.data.token);
                if (rememberMe)
                    localStorage.setItem(
                        'ubook',
                        JSON.stringify(response.data)
                    );
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
                if (errorMsg.response) {
                    dispatch(loginFail());
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
                    isInvalid={error}
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
                    isInvalid={error}
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
