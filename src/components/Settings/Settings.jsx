import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import UserCoverPicture from '../UserCoverPicture/UserCoverPicture';
import UserProfilePicture from '../UserProfilePicture/UserProfilePicture';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import UpdateUserInfoAccordian from '../UpdateUserInfoAccordian/UpdateUserInfoAccordian';

const Settings = () => {
    const { user } = useSelector((state) => state.user);

    return (
        user && (
            <>
                <NavBar />
                <section className="parent">
                    <UserCoverPicture
                        allowEdit={true}
                        picture={user.profile.cover_picture}
                    />
                    <UserProfilePicture
                        allowEdit={true}
                        picture={user.profile.profile_picture}
                        userName={`${user.first_name} ${user.last_name}`}
                        userAge={user.profile__age}
                    />
                </section>
                <Container className="profile-body">
                    <Row>
                        <Col md="4">
                            <UserInfoAccordian userInfo={user.profile} />
                        </Col>
                        <Col md="8">
                            <UpdateUserInfoAccordian />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    );
};

export default Settings;
