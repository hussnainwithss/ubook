import React from 'react';
import LoginNavBar from './LoginNavBar';
import DefaultNavBar from './DefaultNavBar';
import { useSelector } from 'react-redux';
let NavBar = ({ searchParams }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    return isAuthenticated ? (
        user && (
            <DefaultNavBar
                userPicture={user.profile.profile_picture}
                userName={`${user.first_name} ${user.last_name}`}
                searchParams={searchParams}
            />
        )
    ) : (
        <LoginNavBar />
    );
};

export default NavBar;
