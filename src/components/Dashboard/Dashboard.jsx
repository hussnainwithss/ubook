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
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({});
    const [profile_picture, setProfilePicture] = useState({});
    const [showProfilePictureModal, setShowProfilePictureModal] =
        useState(false);
    const handlePorfilePictureUploadModalShow = () =>
        setShowProfilePictureModal(true);
    const handlePorfilePictureUploadModalClose = () =>
        setShowProfilePictureModal(false);

    const [cover_picture, setCoverPicture] = useState({});
    const [showCoverPictureModal, setShowCoverPictureModal] = useState(false);
    const handleCoverPictureUploadModalShow = () =>
        setShowCoverPictureModal(true);
    const handleCoverPictureUploadModalClose = () =>
        setShowCoverPictureModal(false);

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

    const profilePictureUploadHandler = (e) => {
        e.preventDefault();
        const PictureData = new FormData();
        PictureData.append(
            'profile_picture',
            profile_picture,
            profile_picture.name
        );
        const headers = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        axios
            .patch(
                'http://localhost:8000/api/update-profile-pictures/',
                PictureData,
                headers
            )
            .then((response) => {
                console.log(response.data);
                console.log(response.data);
                console.log(response.data);
                console.log(response.data);
                handlePorfilePictureUploadModalClose();
            });
    };
    const coverPictureUploadHandler = (e) => {
        e.preventDefault();
        const PictureData = new FormData();
        PictureData.append('cover_picture', cover_picture, cover_picture.name);
        const headers = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        axios
            .patch(
                'http://localhost:8000/api/update-profile-pictures/',
                PictureData,
                headers
            )
            .then((response) => {
                console.log(response.data);
                console.log(response.data);
                console.log(response.data);
                console.log(response.data);
                handleCoverPictureUploadModalClose();
            });
    };
    useEffect(getPostsData, [newPost]);

    return (
        <div>
            <NavBar isLoggedIn={true} />
            <section className="parent">
                <div className="image1">
                    <Button
                        onClick={handleCoverPictureUploadModalShow}
                        variant="link"
                        className="picture-upload-button w-100 cover-image"
                    >
                        <Image
                            src={process.env.PUBLIC_URL + '/img/connected.png'}
                            className="w-100 cover-image"
                        />
                    </Button>
                </div>
                <div className="image2">
                    <Button
                        onClick={handlePorfilePictureUploadModalShow}
                        variant="link"
                        className="picture-upload-button"
                    >
                        <Image
                            src={process.env.PUBLIC_URL + '/img/user.png'}
                            className="rounded-circle border border-light border-2 profile-image image-responsive"
                        ></Image>
                    </Button>
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
                            {posts.map((post, _) => {
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
            <Modal
                show={showProfilePictureModal}
                onHide={handlePorfilePictureUploadModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload New Profile Picture</Modal.Title>
                </Modal.Header>
                <Form onSubmit={profilePictureUploadHandler}>
                    <Modal.Body>
                        <Form.File
                            accept="image/*"
                            onChange={(e) =>
                                setProfilePicture(e.target.files[0])
                            }
                            required
                        ></Form.File>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handlePorfilePictureUploadModalClose}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Upload
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal
                show={showCoverPictureModal}
                onHide={handleCoverPictureUploadModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload New Cover Picture</Modal.Title>
                </Modal.Header>
                <Form onSubmit={coverPictureUploadHandler}>
                    <Modal.Body>
                        <Form.File
                            accept="image/*"
                            onChange={(e) => setCoverPicture(e.target.files[0])}
                            required
                        ></Form.File>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCoverPictureUploadModalClose}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Upload
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;
