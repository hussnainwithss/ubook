import React, { useEffect, useState } from 'react';
import {
    Card,
    Row,
    Col,
    Container,
    Image,
    Modal,
    Button,
    Form,
} from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import UserInfoAccordian from '../UserInfoAccordian/UserInfoAccordian';
import NavBar from '../NavBar/NavBar';
import CreatePostPrompt from '../CreatePostPrompt/CreatePostPrompt';
import Post from '../Post/Post';
import UserCoverPicture from '../UserCoverPicture/UserCoverPicture';
import UserProfilePicture from '../UserProfilePicture/UserProfilePicture';

const Dashboard = () => {
    const TOKEN = '849a631356ad9a6d1ad1cd7c28607eb764f83d3a';
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [newPost, setNewPost] = useState({});
    const [cover_picture, setCoverPicture] = useState('');
    const [profile_picture, setProfilePicture] = useState('');

    const getPostsData = () => {
        axios
            .get('http://localhost:8000/api/post/', {
                headers: {
                    Authorization: `Token ${TOKEN}`,
                },
            })
            .then((response) => {
                setPosts(response.data);
            });
    };
    useEffect(getPostsData, [newPost]);

    const getUserData = () => {
        const requestData = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        if (id) {
            requestData.params = {
                id,
            };
        }
        axios
            .get('http://localhost:8000/api/user/', requestData)
            .then((response) => {
                setUser(response.data);
                setCoverPicture(response.data.profile.cover_picture);
                setProfilePicture(response.data.profile.profile_picture);
            });
    };
    useEffect(getUserData, [id]);

    return (
        user && (
            <div>
                <NavBar
                    isLoggedIn={true}
                    userName={`${user.first_name} ${user.last_name}`}
                    userPicture={profile_picture}
                />
                <section className="parent">
                    <UserCoverPicture
                        allowEdit={id === undefined ? true : false}
                        picture={cover_picture}
                        updateCoverPictureHook={setCoverPicture}
                    />
                    <UserProfilePicture
                        allowEdit={id === undefined ? true : false}
                        picture={profile_picture}
                        updateProfilePictureHook={setProfilePicture}
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
                            {id ? (
                                ''
                            ) : (
                                <CreatePostPrompt
                                    className="mb-5"
                                    setNewPost={setNewPost}
                                />
                            )}
                            {posts.map((post, _) => {
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
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    );
};

export default Dashboard;
