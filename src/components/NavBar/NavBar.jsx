import React from 'react';
import LoginNavBar from './LoginNavBar';
import DefaultNavBar from './DefaultNavBar';

let NavBar = ({ isLoggedIn, userPicture, userName }) => {
    return isLoggedIn ? (
        <DefaultNavBar userPicture={userPicture} userName={userName} />
    ) : (
        <LoginNavBar />
    );
};

export default NavBar;
