import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

let ProfileBadge = ({ picture, name }) => {
    return (
        <div>
            <Link to="/settings">
                <Image
                    src={
                        picture
                            ? picture
                            : process.env.PUBLIC_URL + '/img/user.png'
                    }
                    className="profile-badge-image rounded-circle"
                ></Image>
                <span className="no-text-decoration white-text">
                    {name ? name : 'User'}
                </span>
            </Link>
        </div>
    );
};

export default ProfileBadge;
