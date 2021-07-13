import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import NavBar from '../NavBar/NavBar';
import CreatePostPrompt from '../CreatePostPrompt/CreatePostPrompt';
const USER_INFO = {
    bio: 'This is my bio',
    birthday: '1999-01-18',
    gender: 'Male',
    education: 'LUMS',
    relationship_status: 'Single',
};
const Dashboard = () => {
    return (
        <div>
            <NavBar isLoggedIn={true} />
            <section>
                <Container></Container>
            </section>
            <section>
                <Container className="profile-body">
                    <Row>
                        <Col md="4">
                            <UserInfoAccordian userInfo={USER_INFO} />
                        </Col>
                        <Col md="8">
                            <CreatePostPrompt className="mb-5" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Dashboard;
