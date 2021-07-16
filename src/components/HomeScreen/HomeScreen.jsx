import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import NavBar from '../NavBar/NavBar';
import Welcome from '../Welcome/Welcome';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
let HomeScreen = () => {
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
