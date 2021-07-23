import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import UserCoverPicture from '../UserCoverPicture/UserCoverPicture';
import UserProfilePicture from '../UserProfilePicture/UserProfilePicture';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import UpdateUserInfoAccordian from '../UpdateUserInfoAccordian/UpdateUserInfoAccordian';
import { useCookies } from 'react-cookie';
const Settings = () => {
    const [user, setUser] = useState(null);
    const [userUpdated, setUserUpdated] = useState(false);
    const [cover_picture, setCoverPicture] = useState('');
    const [profile_picture, setProfilePicture] = useState('');
    const [cookies] = useCookies(['authToken']);
    const TOKEN = cookies.authToken;

    const getUserData = () => {
        const requestData = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        axios
            .get('http://localhost:8000/api/user/', requestData)
            .then((response) => {
                setUser(response.data);
                setCoverPicture(response.data.profile.cover_picture);
                setProfilePicture(response.data.profile.profile_picture);
            });
    };
    useEffect(getUserData, [userUpdated]);
    return (
        user && (
            <>
                <NavBar
                    userName={`${user.first_name} ${user.last_name}`}
                    userPicture={profile_picture}
                />
                <section className="parent">
                    <UserCoverPicture
                        allowEdit={true}
                        picture={cover_picture}
                        updateCoverPictureHook={setCoverPicture}
                    />
                    <UserProfilePicture
                        allowEdit={true}
                        picture={profile_picture}
                        updateProfilePictureHook={setProfilePicture}
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
                            <UpdateUserInfoAccordian
                                userProfileUpdatedHook={setUserUpdated}
                                userInfo={user}
                            />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    );
};

export default Settings;
