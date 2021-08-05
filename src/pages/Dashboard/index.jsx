import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchUserInfoAction } from 'pages/Auth/ducks/actions';
import ProfileImagesSection from 'components/ProfileImagesSection';
import ProfileContainer from 'elements/Profile/ProfileContainer';
import UserInfoAccordian from 'components/UserInfoAccordian';
import CreatePostPrompt from 'components/CreatePostPrompt';
const Dashboard = ({ fetchUserInfo, user }) => {
  useEffect(() => {
    fetchUserInfo().then((resp) => resp);
  }, []);
  return (
    <ErrorBoundary>
      <>
        {user && user.profile && (
          <>
            <ProfileImagesSection user={user} />
            <ProfileContainer>
              <Row>
                <Col md='4'>
                  <UserInfoAccordian userInfo={user.profile} />
                </Col>
                <Col md='8'>
                  <CreatePostPrompt />
                </Col>
              </Row>
            </ProfileContainer>
          </>
        )}
      </>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (id) => dispatch(fetchUserInfoAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
