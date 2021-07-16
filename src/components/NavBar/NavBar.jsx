import React from 'react';
import LoginNavBar from './LoginNavBar';
import DefaultNavBar from './DefaultNavBar';
import { useSelector } from 'react-redux';
let NavBar = ({ userPicture, userName }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated ? (
        <DefaultNavBar userPicture={userPicture} userName={userName} />
    ) : (
        <LoginNavBar />
    );
};

export default NavBar;
