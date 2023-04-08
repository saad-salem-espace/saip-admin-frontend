import {
  Container,
  Navbar,
  Nav,
  Dropdown,
} from 'react-bootstrap/';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { BsGrid, BsListUl, BsStar } from 'react-icons/bs';
import LanguageSwitch from './shared/LanguageSwitch';
import RecentSearch from './shared/RecentSearch';
import UserAvatar from '../../shared/user-avatar/UserAvatar';

function LoggedNavbar() {
  const auth = useAuth();
  const { t } = useTranslation('layout');
  return (
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
            <RecentSearch>
              <Dropdown.Item to="#/action-1" as={Link}>Action logged</Dropdown.Item>
              <Dropdown.Item to="#/action-2" as={Link}>Another action logged</Dropdown.Item>
              <Dropdown.Item to="#/action-3" as={Link}>Something else logged</Dropdown.Item>
            </RecentSearch>
            <div className="d-flex justify-content-center h-39">
              {/* Notifications */}
              <div className="edges-border notifications new">
                <Nav.Link to="#features" as={Link} variant="transparent">
                  <FaRegBell className="icon m-0" />
                  <div className="number-notifications">99+</div>
                </Nav.Link>
              </div>
              {/* Switch language */}
              <LanguageSwitch />
              {/* Avatar & control */}
              <Dropdown>
                <Dropdown.Toggle variant="transparent" className="appBtn avatar-btn btn nav-link mx-auto" size="lg" id="dropdown-basic">
                  <UserAvatar
                    name={auth.user?.profile.preferred_username}
                    size="39px"
                  />
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

export default LoggedNavbar;
