import React from 'react';
import { Navbar, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from 'components/SearchBar/SearchBar';
import ProfileBadge from 'components/ProfileBadge/ProfileBadge';
import { logoutPending, logoutSuccessful, logoutFail } from 'redux/authSlice';
import { deleteUserToken } from 'utils/user';

const DefaultNavBar = ({ userName, userPicture, searchParams }) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const logoutHander = (e) => {
        e.preventDefault();
        dispatch(logoutPending());
        deleteUserToken();
        sessionStorage.clear();
        localStorage.clear();
        dispatch(logoutSuccessful());
    };

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
                    <SearchBar searchParams={searchParams} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ProfileBadge picture={userPicture} name={userName} />
                </Col>
                <Col md="4">
                    <Form onSubmit={logoutHander}>
                        <Button
                            type="submit"
                            variant="danger"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </span>
                            ) : (
                                'Logout'
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Navbar>
    );
};

export default DefaultNavBar;
