import React, { useState } from 'react';
import axios from 'axios';
import { Image, Button, Modal, Form } from 'react-bootstrap';

const ProfilePicture = ({ picture }) => {
    return (
        <Image
            src={picture ? picture : process.env.PUBLIC_URL + '/img/user.png'}
            className="rounded-circle border border-light border-2 profile-image image-responsive"
        ></Image>
    );
};

const UserProfilePicture = ({
    allowEdit,
    picture,
    updateProfilePictureHook,
    userName,
    userAge,
}) => {
    const TOKEN = '849a631356ad9a6d1ad1cd7c28607eb764f83d3a';
    const [profile_picture, setProfilePicture] = useState({});
    const [showProfilePictureModal, setShowProfilePictureModal] =
        useState(false);

    const handlePorfilePictureUploadModalShow = () =>
        setShowProfilePictureModal(true);
    const handlePorfilePictureUploadModalClose = () =>
        setShowProfilePictureModal(false);

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
                handlePorfilePictureUploadModalClose();
                updateProfilePictureHook(response.data.profile_picture);
            });
    };
    return (
        <>
            <div className="image2">
                {!allowEdit ? (
                    <ProfilePicture picture={picture} />
                ) : (
                    <a
                        onClick={handlePorfilePictureUploadModalShow}
                        className="overlay-button"
                    >
                        <ProfilePicture picture={picture} />
                        <div className="overlay rounded-circle">
                            <div className="text">Update Profile Picture</div>
                        </div>
                    </a>
                )}

                <span className="profile-name">{`${userName}, ${userAge}`}</span>
            </div>
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
        </>
    );
};

export default UserProfilePicture;
