import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import NavBar from '../NavBar/NavBar';
import CreatePostPrompt from '../CreatePostPrompt/CreatePostPrompt';
import Post from '../Post/Post';
const Dashboard = () => {
    const USER_INFO = {
        bio: 'This is my bio',
        birthday: '1999-01-18',
        gender: 'Male',
        education: 'LUMS',
        relationship_status: 'Single',
    };
    const TOKEN = '89e4473a23e46a19218891280e7e18651c351a5e';
    const [posts, setPosts] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const getPostsData = () => {
        axios
            .get('http://localhost:8000/api/post/', {
                headers: {
                    Authorization: `Token ${TOKEN}`,
                },
            })
            .then((response) => {
                setPosts(response.data);
                console.log(posts);
            });
    };
    useEffect(getPostsData, [newPost]);

    return (
        <div>
            <NavBar isLoggedIn={true} />
            <section className="parent">
                <div className="image1">
                    <Image
                        src={process.env.PUBLIC_URL + '/img/connected.png'}
                        className="w-100 cover-image"
                    />
                </div>
                <div className="image2">
                    <Image
                        src={process.env.PUBLIC_URL + '/img/user.png'}
                        className="rounded-circle border border-light border-2 profile-image image-responsive"
                    ></Image>
                    <span className="profile-name">Hussnain Ahmad</span>
                </div>
            </section>
            <section>
                <Container className="profile-body">
                    <Row>
                        <Col md="4">
                            <UserInfoAccordian userInfo={USER_INFO} />
                        </Col>
                        <Col md="8">
                            <CreatePostPrompt
                                className="mb-5"
                                setNewPost={setNewPost}
                            />
                            {posts &&
                                posts.map((post, _) => {
                                    return (
                                        <Post
                                            props={post}
                                            key={`${post.feed_type}-${post.content}`}
                                        />
                                    );
                                })}
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Dashboard;
