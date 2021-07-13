import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
let Login = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    function loginUser(e) {
        e.preventDefault();
        const userLoginCreds = {
            username: userName,
            password: userPassword,
        };
        axios
            .post('http://localhost:8000/api/login/', userLoginCreds)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) console.log(error.response.data);
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
                />
                <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    className="login-bottom-text"
                    name="remember-me"
                />
            </Form.Group>
            <Form.Group className="mr-2 mb-0">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <Form.Text className="mt-0">
                    <a className="login-bottom-text  white-text " href="/#">
                        Forgot your Password?
                    </a>
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Login;
