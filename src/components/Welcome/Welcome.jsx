import React from 'react';
import Image from 'react-bootstrap/Image';
let Welcome = () => {
    return (
        <div className="register-main">
            <h2>UBook</h2>
            <h4>
                Bringing you closer to your Loved ones, Friends & Colleagues
            </h4>
            <Image
                src={process.env.PUBLIC_URL + '/img/connected.png'}
                fluid
            ></Image>
        </div>
    );
};

export default Welcome;
