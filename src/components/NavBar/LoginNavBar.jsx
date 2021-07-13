import React from 'react';
import { Navbar } from 'react-bootstrap';
import Login from '../Login/Login';

let LoginNavBar = () => {
    return (
        <Navbar className="navbar-color d-flex justify-content-between">
            <Navbar.Brand href="/#" className="white-text ">
                UBook
            </Navbar.Brand>
            <Login />
        </Navbar>
    );
};

export default LoginNavBar;
