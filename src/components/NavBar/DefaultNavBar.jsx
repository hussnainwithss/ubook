import React from 'react';
import { Navbar, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ProfileBadge from '../ProfileBadge/ProfileBadge';
let DefaultSearchBar = () => {
    return (
        <Navbar className="navbar-color d-flex white-text justify-content-between">
            <Row>
                <Col md="3">
                    <Link to="/dashboard">
                        <Navbar.Brand className="white-text ">
                            UBook
                        </Navbar.Brand>
                    </Link>
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
