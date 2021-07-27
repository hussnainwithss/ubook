import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from 'components/NavBar/NavBar';
import Welcome from 'components/Welcome/Welcome';
import RegistrationForm from 'components/RegistrationForm/RegistrationForm';

const HomeScreen = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Row>
                    <Col md="8">
                        <Welcome />
                    </Col>
                    <Col md="4">
                        <RegistrationForm />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeScreen;
