import React from 'react';
import { ImagesSection } from 'components/ProfileImagesSection/style';
import UserCoverPicture from 'components/UserCoverPicture';
import UserProfilePicture from 'components/UserProfilePicture';

const ProfileImagesSection = ({ user }) => {
  console.log(user);
  return (
    <ImagesSection>
      <UserCoverPicture user={user} />
      <UserProfilePicture user={user} />
    </ImagesSection>
  );
};

export default ProfileImagesSection;
