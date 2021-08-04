import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Image, Button, Modal, Form as FormBS } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCoverPicture } from 'api';

const CoverPicture = ({ picture }) => {
  return (
    <Image
      src={picture ? picture : process.env.PUBLIC_URL + '/img/cover.png'}
      className='w-100 cover-image'
    />
  );
};

const UserCoverPicture = ({ allowEdit, picture }) => {
  const [cover_picture, setCoverPicture] = useState({});
  const [showCoverPictureModal, setShowCoverPictureModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleCoverPictureUploadModalShow = () =>
    setShowCoverPictureModal(true);
  const handleCoverPictureUploadModalClose = () =>
    setShowCoverPictureModal(false);
  const coverPictureUploadHandler = (e) => {
    e.preventDefault();
    updateUserCoverPicture(cover_picture).then((response) => {
      handleCoverPictureUploadModalClose();
      console.log(response);
    });
  };

  return (
    <>
      <div className='image1'>
        {!allowEdit ? (
          <CoverPicture picture={picture} />
        ) : (
          <Button
            onClick={handleCoverPictureUploadModalShow}
            variant='link'
            className='picture-upload-button w-100 cover-image overlay-button'
          >
            <CoverPicture picture={user.profile.cover_picture} />
            <div className='overlay overlay-cover'>
              <div className='text'>Update Cover Picture</div>
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
        <FormBS onSubmit={coverPictureUploadHandler}>
          <Modal.Body>
            <FormBS.File
              accept='image/*'
              onChange={(e) => setCoverPicture(e.target.files[0])}
              required
            ></FormBS.File>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleCoverPictureUploadModalClose}
            >
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Upload
            </Button>
          </Modal.Footer>
        </FormBS>
      </Modal>
    </>
  );
};

export default UserCoverPicture;
