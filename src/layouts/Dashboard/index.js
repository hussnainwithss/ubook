import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';

const Dashboard = (Content) => {
  return (props) => {
    return (
      <>
        <Header />
        <Container fluid>
          <Content {...props} />
        </Container>
      </>
    );
  };
};

export default Dashboard;
