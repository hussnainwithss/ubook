import React, { useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import NavBar from '../NavBar/NavBar';
import CreatePostPrompt from '../CreatePostPrompt/CreatePostPrompt';
import Post from '../Post/Post';
import UserCoverPicture from '../UserCoverPicture/UserCoverPicture';
import UserProfilePicture from '../UserProfilePicture/UserProfilePicture';

const UserProfile = ({ allowEdit, posts, user }) => {
    const [newPost, setNewPost] = useState({});
    return (
        <>
            <NavBar />
            <section className="parent">
                <UserCoverPicture
                    allowEdit={allowEdit}
                    picture={user.profile.cover_picture}
                />
                <UserProfilePicture
                    allowEdit={allowEdit}
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
                        {allowEdit ? (
                            <CreatePostPrompt
                                className="mb-5"
                                setNewPost={setNewPost}
                            />
                        ) : (
                            ''
                        )}
                        {posts.length !== 0 ? (
                            posts.map((post, _) => {
                                return (
                                    <Post
                                        post={post}
                                        key={`${post.content}-${post.created_at}`}
                                        userName={`${user.first_name} ${user.last_name}`}
                                        profilePicture={
                                            user.profile.profile_picture
                                        }
                                    />
                                );
                            })
                        ) : (
                            <Card>
                                <Card.Body>No posts yet!</Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserProfile;
