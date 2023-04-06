import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsGrid, BsStar, BsListUl } from 'react-icons/bs';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { FaRegBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import React from 'react';
import { useAuth } from 'react-oidc-context';
import Image from 'react-bootstrap/Image';
import logo from '../../../assets/images/Logo.png';
// import roleMapper from 'utils/roleMapper';

import './AppNavbar.scss';

function AppNavbar() {
  const { t } = useTranslation('layout');
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return (
    // { Logged Navbar }
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="light" className="app-navbar logged p-4 shadow">
        <Container fluid className="px-lg-15">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Left navbar */}
            <Nav className="me-auto">
              <Nav.Link to="#" as={Link} className="appBtn has-icon btn btn-primary pe-3 me-5">
                <BsGrid className="icon" />
                {t('navbar.dashboard')}
              </Nav.Link>
              <Nav.Link to="#" as={Link} className="has-icon">
                <MdOutlineBookmarkBorder className="icon" />
                {t('navbar.myBookmarks')}
              </Nav.Link>
              <Nav.Link to="#" as={Link} className="has-icon ps-lg-5">
                <BsStar className="icon" />
                {t('navbar.savedQueries')}
              </Nav.Link>
              <Nav.Link to="#" as={Link} className="has-icon">
                <BsListUl className="icon list" />
                {t('navbar.myActivity')}
              </Nav.Link>
            </Nav>
            {/* Right navbar */}
            <Nav className="align-items-center">
              <Nav.Link to="#features" as={Link} className="appBtn btn btn-primary pe-lg-3 me-lg-5 px-3">
                {t('navbar.ipSearch')}
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="primary-10" className="appBtn has-icon btn nav-link mx-auto my-3 my-lg-0" size="lg" id="dropdown-basic">
                  <RxCounterClockwiseClock className="icon" />
                  {t('navbar.recentSearch')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="d-flex justify-content-center">
                {/* Notifications */}
                <div className="edges-border notifications new">
                  <Nav.Link to="#features" as={Link} variant="transparent">
                    <FaRegBell className="icon m-0" />
                    <div className="number-notifications">99+</div>
                  </Nav.Link>
                </div>
                {/* Switch language */}
                <div className="pe-lg-5 me-lg-5 switch-language">
                  <Dropdown>
                    <Dropdown.Toggle variant="primary-10" className="appBtn has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
                      {t('navbar.english')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-2">
                        {t('navbar.arabic')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                {/* Avatar & control */}
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" className="appBtn avatar-btn btn nav-link mx-auto" size="lg" id="dropdown-basic">
                    <Avatar name={auth.user?.profile.preferred_username} size="40" round="50%" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item variant="primary" onClick={() => auth.removeUser()}>
                      {t('navbar.logOut')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                {/* { Need to align with dina to handle position for this element } */}
                {/* {roleMapper(auth.user?.profile.clientRoles[0])} */}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    // { Guest Navbar }
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="light" className="app-navbar guest p-4 shadow">
      <Container fluid className="px-lg-15">
        <Navbar.Brand href="#home">
          <Image src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left navbar */}
          <Nav className="me-auto">
            <Nav.Link to="#" as={Link} className="has-icon ps-lg-5">
              <BsStar className="icon" />
              {t('navbar.myQueries')}
            </Nav.Link>
            <Nav.Link to="#" as={Link} className="has-icon">
              <MdOutlineBookmarkBorder className="icon" />
              {t('navbar.myBookmarks')}
            </Nav.Link>
          </Nav>
          {/* Right navbar */}
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="primary-10" className="appBtn has-icon btn nav-link mx-auto my-3 my-lg-0" size="lg" id="dropdown-basic">
                <RxCounterClockwiseClock className="icon" />
                {t('navbar.recentSearch')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex justify-content-center">
              {/* Sign in / Sign up buttons */}
              <div className="edges-border d-flex mx-lg-3 px-lg-3 me-2">
                <Nav.Link onClick={() => auth.signinRedirect()} to="#features" as={Link} className="appBtn btn btn-outline-primary pe-lg-3 me-lg-3 me-2 px-3">
                  {t('navbar.login')}
                </Nav.Link>
                <Nav.Link to="#features" as={Link} className="appBtn btn btn-primary px-3">
                  {t('navbar.signup')}
                </Nav.Link>
              </div>
              {/* Switch language */}
              <div className="pe-lg-5 me-lg-5 switch-language">
                <Dropdown>
                  <Dropdown.Toggle align="start" variant="primary-10" className="appBtn has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
                    {t('navbar.english')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">
                      {t('navbar.arabic')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div>
              {/* {roleMapper(auth.user?.profile.clientRoles[0])} */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
