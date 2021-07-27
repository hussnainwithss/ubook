import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { loginPending, loginSuccessful } from 'redux/authSlice';
import { setMessage } from 'redux/messageAlertSlice';
import { API_BASE_PATH } from 'config';

const RegistrationForm = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [_, setCookie] = useCookies(['authToken']);
    const history = useHistory();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    function userRegistrationHandler(e) {
        e.preventDefault();
        const userRegistrationData = {
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            birthday,
            gender,
        };

        axios
            .post(`${API_BASE_PATH}/register/`, userRegistrationData)
            .then((response) => {
                console.log(response);
                dispatch(loginPending());
                const userLoginCreds = {
                    username: email,
                    password: password,
                };
                const cookies_params = {
                    path: '/',
                    sameSite: 'strict',
                };

                axios
                    .post(`${API_BASE_PATH}/login/`, userLoginCreds)
                    .then((response) => {
                        setCookie(
                            'authToken',
                            response.data.token,
                            cookies_params
                        );
                        dispatch(loginSuccessful());
                        dispatch(
                            setMessage({
                                message: 'Login Successful',
                                type: 'success',
                            })
                        );
                        history.push('/dashboard/');
                    });
            })
            .catch((error) => {
                if (error.response) console.log(error.response.data);
            });
    }

    return (
        <div className="register-main">
            <h3>Register Now</h3>
            <hr />
            <Form onSubmit={userRegistrationHandler}>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="first-name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="last-name"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Birthday"
                            name="birthday"
                            max={new Date().toISOString().split('T')[0]}
                            required
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Label className="mb-0">Gender: </Form.Label>

                <Form.Group className="mb-0">
                    <Form.Check
                        inline
                        label="Male"
                        type="radio"
                        value="Male"
                        name="gender"
                        required
                        onChange={(e) => setGender(e.currentTarget.value)}
                    />
                    <Form.Check
                        inline
                        label="Female"
                        type="radio"
                        value="Female"
                        name="gender"
                    />
                    <Form.Check
                        inline
                        label="Others"
                        type="radio"
                        value="Others"
                        name="gender"
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    By clicking Sign Up, you agree to our Terms and that you
                    have read our Data Use Policy, including our Cookie Use.
                </Form.Text>
                <Form.Group>
                    <Button variant="primary" type="submit">
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
                            'Sign Up'
                        )}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default RegistrationForm;
