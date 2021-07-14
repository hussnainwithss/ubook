import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileCard = ({ picture, name, hometown, age, gender, extras }) => {
    console.log({ picture, name, hometown, age, gender, extras });
    return (
        <Card className="mb-2">
            <Card.Body>
                <Link to="/search" className="no-text-decoration black-text">
                    <Row>
                        <Col className="col-auto">
                            <Image
                                src={
                                    picture
                                        ? picture
                                        : process.env.PUBLIC_URL +
                                          '/img/user.png'
                                }
                                className="profile-card-image rounded-circle"
                            ></Image>
                        </Col>
                        <Col>
                            <Row>
                                {name}
                                {hometown ? `, ${hometown}` : ''}
                            </Row>
                            <Row>{`${gender}, ${age}`}</Row>
                            <Row>{extras}</Row>
                        </Col>
                    </Row>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard;
