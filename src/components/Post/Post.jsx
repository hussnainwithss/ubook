import React from 'react';
import { Card, Image } from 'react-bootstrap';

const Post = ({ props }) => {
    console.log(props);
    return (
        <Card className="mb-3">
            {props.feed_type === 'register' ? (
                <Card.Header>HURRAY!</Card.Header>
            ) : (
                ''
            )}
            <Card.Body>
                <Card.Text>{props.content}</Card.Text>
                {props.feed_type === 'add_new_photo' ? (
                    <Image
                        src={props.image}
                        className="img-responsive card-img-bottom"
                    ></Image>
                ) : (
                    ''
                )}
            </Card.Body>
        </Card>
    );
};

export default Post;
