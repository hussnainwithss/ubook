import React, { useState } from 'react';
import axios from 'axios';
import { Image, Button, Modal, Form } from 'react-bootstrap';

const CoverPicture = ({ picture }) => {
    return (
        <Image
            src={picture ? picture : process.env.PUBLIC_URL + '/img/cover.png'}
            className="w-100 cover-image"
        />
    );
};
const UserCoverPicture = ({ allowEdit, picture, updateCoverPictureHook }) => {
    const TOKEN = '89e4473a23e46a19218891280e7e18651c351a5e';
    const [cover_picture, setCoverPicture] = useState({});
    const [showCoverPictureModal, setShowCoverPictureModal] = useState(false);

    const handleCoverPictureUploadModalShow = () =>
        setShowCoverPictureModal(true);
    const handleCoverPictureUploadModalClose = () =>
        setShowCoverPictureModal(false);
    console.log('Allow edit cover:', allowEdit);
    console.log('Allow edit cover:', allowEdit);
    console.log('Allow edit cover:', allowEdit);
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
                handleCoverPictureUploadModalClose();
                updateCoverPictureHook(response.data.cover_picture);
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
                        <CoverPicture picture={picture} />
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
