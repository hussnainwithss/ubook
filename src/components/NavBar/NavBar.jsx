import React from 'react';
import LoginNavBar from './LoginNavBar';
import DefaultNavBar from './DefaultNavBar';

let NavBar = ({ isLoggedIn }) => {
    return isLoggedIn ? <DefaultNavBar /> : <LoginNavBar />;
};

export default NavBar;
