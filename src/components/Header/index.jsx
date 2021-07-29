import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME } from 'config';
import { AppRoutes, DashboardRoutes } from 'routes';
import {
  UserDropDown,
  NavDropDownLink,
  AppTitle,
  NavBar,
} from 'components/Header/style';
import LoginForm from 'components/LoginForm';
/**
 * Header is a template top navigation bar of user layout
 */
const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <NavBar collapseOnSelect expand='lg' variant='dark'>
      <NavBar.Brand>
        <AppTitle to={AppRoutes.DASHBOARD.path}>{APP_NAME}</AppTitle>
      </NavBar.Brand>
      <NavBar.Toggle aria-controls='responsive-navbar-nav' />
      <NavBar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'></Nav>
        <Nav>
          {isAuthenticated ? (
            <UserDropDown
              alignRight
              className='dropdown-menu-right'
              title={<FontAwesomeIcon icon={faUserCircle} title='' />}
            >
              <NavDropDownLink to={DashboardRoutes.PROFILE.path}>
                Profile
              </NavDropDownLink>
              <NavDropdown.Divider />
              <NavDropDownLink to={DashboardRoutes.CHANGE_PASSWORD.path}>
                Change Password
              </NavDropDownLink>
              <NavDropdown.Divider />
              <NavDropDownLink to={AppRoutes.LOGOUT.path}>
                Logout
              </NavDropDownLink>
            </UserDropDown>
          ) : (
            <LoginForm />
          )}
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  );
};

export default Header;
