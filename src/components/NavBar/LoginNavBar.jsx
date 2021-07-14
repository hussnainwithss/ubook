import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';

let LoginNavBar = () => {
    return (
        <Navbar className="navbar-color d-flex justify-content-between">
            <Link to="/dashboard">
                <Navbar.Brand href="/dashboard" className="white-text ">
                    UBook
                </Navbar.Brand>
            </Link>
            <Login />
        </Navbar>
    );
};

export default LoginNavBar;
