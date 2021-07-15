import { findByDisplayValue } from '@testing-library/dom';
import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import ProfileBadge from '../ProfileBadge/ProfileBadge';
const Post = ({ post, userName, profilePicture }) => {
    return (
        <Card className="mb-3">
            {post.feed_type === 'register' ? (
                <Card.Header>HURRAY!</Card.Header>
            ) : (
                ''
            )}
            <Card.Body>
                <Row className="m-0 ">
                    <Col md="1" className="pl-0">
                        <Image
                            src={
                                profilePicture
                                    ? profilePicture
                                    : process.env.PUBLIC_URL + '/img/user.png'
                            }
                            className="profile-badge-image rounded-circle"
                        ></Image>
                    </Col>
                    <Col className="user-info-post pl-0">
                        <Row>{userName ? userName : 'User'}</Row>
                        <Row className="time-stamp">
                            {new Date(post.created_at).toDateString()}
                        </Row>
                    </Col>
                </Row>
                <Row className="m-0 mt-2">
                    <Card.Text>{post.content}</Card.Text>
                    {post.feed_type === 'add_new_photo' ? (
                        <Image
                            src={post.image}
                            className="img-responsive card-img-bottom"
                        ></Image>
                    ) : (
                        ''
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Post;
