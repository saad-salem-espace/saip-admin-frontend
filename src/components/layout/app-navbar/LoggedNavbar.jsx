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
import roleMapper from 'utils/roleMapper';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import roleMapper from 'utils/roleMapper';
import Image from 'react-bootstrap/Image';
import LanguageSwitch from './shared/LanguageSwitch';
import RecentSearch from './shared/RecentSearch';
import UserAvatar from '../../shared/user-avatar/UserAvatar';
import logo from '../../../assets/images/logo-shape.png';

function LoggedNavbar({ lang, changeLang }) {
  const auth = useAuth();
  const { t } = useTranslation('layout');
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="light" className="app-navbar logged p-4 shadow">
      <Container fluid>
        <Navbar.Brand to="/" as={Link}>
          <Image src={logo} className="d-block mx-auto" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left navbar */}
          <Nav className="me-auto">
            {(roleMapper(auth?.user?.profile?.clientRoles[0]) === 'External_Examiner' || roleMapper(auth?.user?.profile?.clientRoles[0]) === 'Internal_Examiner') && (
              <Nav.Link to="dashboard" as={Link} className="appBtn has-icon btn btn-primary pe-3 me-5">
                <BsGrid className="icon" />
                {t('navbar.dashboard')}
              </Nav.Link>)}
            <Nav.Link to="#" as={Link} className="has-icon">
              <MdOutlineBookmarkBorder className="icon" />
              {t('navbar.myBookmarks')}
            </Nav.Link>
            <Nav.Link to="/savedQueries" as={Link} className="has-icon ps-lg-5">
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
            <RecentSearch />
            <div className="d-flex justify-content-center h-px-39">
              {/* Notifications */}
              <div className="edges-border notifications new">
                <Nav.Link to="#features" as={Link} variant="transparent">
                  <FaRegBell className="icon m-0" />
                  <div className="number-notifications">99+</div>
                </Nav.Link>
              </div>
              {/* Switch language */}
              <LanguageSwitch className="pe-lg-5 me-lg-5" lang={lang} changeLang={changeLang} />
              {/* Avatar & control */}
              <Dropdown>
                <Dropdown.Toggle variant="transparent" className="appBtn avatar-btn btn nav-link mx-auto" size="lg" id="dropdown-basic">
                  <UserAvatar
                    name={auth.user?.profile.preferred_username}
                    size="39px"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item variant="primary" onClick={() => auth.signoutRedirect()}>
                    {t('navbar.logOut')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
LoggedNavbar.propTypes = {
  changeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};
export default LoggedNavbar;
