import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchUserInfoAction } from 'pages/Auth/ducks/actions';

const Dashboard = ({ fetchUserInfo, user }) => {
  useEffect(() => {
    fetchUserInfo().then((resp) => resp);
  }, []);
  return (
    <ErrorBoundary>
      <h2>Dashboard</h2>
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
