import React, { useState } from 'react';
import { Image, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { updateUserInfo } from 'redux/userSlice';
import { updateUserCoverPicture } from 'api';
const CoverPicture = ({ picture }) => {
    return (
        <Image
            src={picture ? picture : process.env.PUBLIC_URL + '/img/cover.png'}
            className="w-100 cover-image"
        />
    );
};

const UserCoverPicture = ({ allowEdit, picture }) => {
    const [cookies] = useCookies(['authToken']);
    const TOKEN = cookies.authToken;
    const [cover_picture, setCoverPicture] = useState({});
    const [showCoverPictureModal, setShowCoverPictureModal] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleCoverPictureUploadModalShow = () =>
        setShowCoverPictureModal(true);
    const handleCoverPictureUploadModalClose = () =>
        setShowCoverPictureModal(false);
    const coverPictureUploadHandler = (e) => {
        e.preventDefault();
        updateUserCoverPicture(cover_picture).then((response) => {
            handleCoverPictureUploadModalClose();
            dispatch(
                updateUserInfo({
                    ...user,
                    profile: {
                        ...user.profile,
                        cover_picture: response.data.cover_picture,
                    },
                })
            );
        });
    };

    return (
        <>
            <div className="image1">
                {!allowEdit ? (
                    <CoverPicture picture={picture} />
                ) : (
                    <Button
                        onClick={handleCoverPictureUploadModalShow}
                        variant="link"
                        className="picture-upload-button w-100 cover-image overlay-button"
                    >
                        <CoverPicture picture={user.profile.cover_picture} />
                        <div className="overlay overlay-cover">
                            <div className="text">Update Cover Picture</div>
                        </div>
                    </Button>
                )}
            </div>
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
        </>
    );
};

export default UserCoverPicture;
