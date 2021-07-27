import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NavBar from 'components/NavBar/NavBar';
import UserCoverPicture from 'components/UserCoverPicture/UserCoverPicture';
import UserProfilePicture from 'components/UserProfilePicture/UserProfilePicture';
import UserInfoAccordian from 'components/UserInfoAccordian/UserInfoAccordian';
import UpdateUserInfoAccordian from 'components/UpdateUserInfoAccordian/UpdateUserInfoAccordian';

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
