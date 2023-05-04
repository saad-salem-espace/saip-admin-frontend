import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap/';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import { BsStar } from 'react-icons/bs';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import Image from 'react-bootstrap/Image';
import logo from '../../../assets/images/Logo.png';
import LanguageSwitch from './shared/LanguageSwitch';
import RecentSearch from './shared/RecentSearch';

function GuestNavbar() {
  const { t } = useTranslation('layout');
  const auth = useAuth();
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="light" className="app-navbar guest p-4 shadow">
      <Container fluid className="ps-lg-18">
        <Navbar.Brand to="/" as={Link}>
          <Image src={logo} />
          <span className="border-end my-1 ms-6 text-gray-400" />
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
            {/* {Recent search} */}
            <RecentSearch />
            <div className="d-flex justify-content-center h-px-39">
              {/* Sign in / Sign up buttons */}
              <div className="edges-border d-flex mx-lg-3 px-lg-3 me-2">
                <Nav.Link onClick={() => auth.signinRedirect()} as={Link} className="appBtn btn btn-outline-primary pe-lg-3 me-lg-3 me-2 px-3">
                  {t('navbar.login')}
                </Nav.Link>
                <Nav.Link as={Link} className="appBtn btn btn-primary px-3">
                  {t('navbar.signup')}
                </Nav.Link>
              </div>
              {/* Switch language */}
              <LanguageSwitch />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuestNavbar;
