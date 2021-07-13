import React from 'react';
import { Navbar, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import ProfileBadge from '../ProfileBadge/ProfileBadge';
let DefaultSearchBar = () => {
    return (
        <Navbar className="navbar-color d-flex white-text justify-content-between">
            <Row>
                <Col md="3">
                    <Navbar.Brand href="/#" className="white-text ">
                        UBook
                    </Navbar.Brand>
                </Col>
                <Col md="9">
                    <SearchBar />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ProfileBadge picture="" name="Hussnain Ahmad" />
                </Col>
                <Col md="4">
                    <Button type="submit" variant="danger">
                        Logout
                    </Button>
                </Col>
            </Row>
        </Navbar>
    );
};

export default DefaultSearchBar;
