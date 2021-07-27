import React from 'react';
import { useSelector } from 'react-redux';
import LoginNavBar from 'components/NavBar/LoginNavBar';
import DefaultNavBar from 'components/NavBar/DefaultNavBar';

const NavBar = ({ searchParams }) => {
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
