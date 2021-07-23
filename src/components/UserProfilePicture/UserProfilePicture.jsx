import React, { useState } from 'react';
import axios from 'axios';
import { Image, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../redux/userSlice';
import { useCookies } from 'react-cookie';
const ProfilePicture = ({ picture }) => {
    return (
        <Image
            src={picture ? picture : process.env.PUBLIC_URL + '/img/user.png'}
            className="rounded-circle border border-light border-2 profile-image image-responsive"
        ></Image>
    );
};

const UserProfilePicture = ({ allowEdit, picture, userName, userAge }) => {
    const [cookies] = useCookies(['authToken']);
    const TOKEN = cookies.authToken;
    const [profile_picture, setProfilePicture] = useState({});
    const [showProfilePictureModal, setShowProfilePictureModal] =
        useState(false);

    const handlePorfilePictureUploadModalShow = () =>
        setShowProfilePictureModal(true);
    const handlePorfilePictureUploadModalClose = () =>
        setShowProfilePictureModal(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

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
                dispatch(
                    updateUserInfo({
                        ...user,
                        profile: {
                            ...user.profile,
                            profile_picture: response.data.profile_picture,
                        },
                    })
                );
            });
    };
    return (
        <>
            <div className="image2">
                {!allowEdit ? (
                    <>
                        <ProfilePicture picture={picture} />
                        <span className="profile-name">{`${userName}, ${userAge}`}</span>
                    </>
                ) : (
                    <>
                        <a
                            onClick={handlePorfilePictureUploadModalShow}
                            className="overlay-button"
                        >
                            <ProfilePicture
                                picture={user.profile.profile_picture}
                            />
                            <div className="overlay rounded-circle">
                                <div className="text">
                                    Update Profile Picture
                                </div>
                            </div>
                        </a>
                        <span className="profile-name">{`${user.first_name} ${user.last_name}, ${user.profile__age}`}</span>
                    </>
                )}
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
