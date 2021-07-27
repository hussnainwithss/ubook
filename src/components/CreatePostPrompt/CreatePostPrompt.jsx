import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';
import { updateUserPosts } from 'redux/userSlice';
import { createPost } from 'api';

const CreatePostPrompt = ({ setNewPost }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    function createPostHandler(e) {
        e.preventDefault();
        if (!content && !image) {
            return;
        }
        createPost(content, image)
            .then((response) => {
                setNewPost(response.data);
                dispatch(updateUserPosts(response.data));
            })
            .catch((error) => {
                if (error.response) console.log(error.response.data);
            });
        setContent('');
        e.target.image.value = null;
    }

    return (
        <Card className="mb-5">
            <Card.Body>
                <Form onSubmit={createPostHandler}>
                    <div className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="What's on your mind....."
                            className="post-textarea"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.File
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            name="image"
                        />
                    </div>
                    <Button varriant="primary" type="submit">
                        Post
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreatePostPrompt;
