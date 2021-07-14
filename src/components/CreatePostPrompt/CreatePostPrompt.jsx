import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreatePostPrompt = ({ setNewPost }) => {
    const TOKEN = '89e4473a23e46a19218891280e7e18651c351a5e';
    const [content, setContent] = useState(null);
    const [image, setImage] = useState(null);
    function createPostHandler(e) {
        e.preventDefault();
        const postData = new FormData();
        if (content) postData.append('content', content);
        else {
            return;
        }
        if (image) {
            postData.append('image', image, image.name);
        }
        const headers = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        axios
            .post('http://localhost:8000/api/post/', postData, headers)
            .then((response) => {
                console.log(response);
                setNewPost(response.data);
            })
            .catch((error) => {
                if (error.response) console.log(error.response.data);
            });
        setContent(null);
        setImage(null);
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
                        ></Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.File
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        ></Form.File>
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
