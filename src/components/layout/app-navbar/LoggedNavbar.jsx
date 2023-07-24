import {
  Container, Navbar, Nav, Dropdown,
} from 'react-bootstrap/';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BsGrid, BsListUl } from 'react-icons/bs';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect, useState,
} from 'react';
import getHistoryApi from 'apis/history/getHistoryApi';
import useAxios from 'hooks/useAxios';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import routes from 'components/routes/routes.json';
import Notifications from './notifications/Notifications';
import useAuth from '../../../hooks/useAuth';
import LanguageSwitch from './shared/LanguageSwitch';
import RecentSearch from './shared/recent-search/RecentSearch';
import UserAvatar from '../../shared/user-avatar/UserAvatar';
import logo from '../../../assets/images/logo-shape.png';
import MyBookmarksLink from './shared/MyBookmarksLink';
import MyQueriesLink from './shared/MyQueriesLink';
import Accessibility from './shared/Accessibility';
import { roles } from '../../../utils/roleMapper';
import { convertQueryArrToStr } from '../../../utils/searchQuery';
import DropdownItem from './shared/recent-search/DropdownItem';
import HelpLink from './shared/HelpLink';

function LoggedNavbar({
  lang,
  changeLang,
  hideFocusArea,
}) {
  const { user, role, requestSignOut } = useAuth();
  const logout = () => {
    hideFocusArea();
    requestSignOut();
  };
  const { t } = useTranslation('layout');
  const [history, setHistory] = useState([]);
  const { workStreamId } = useContext(SelectedWorkStreamIdContext);
  const isSearchSumbitted = Number(localStorage.getItem('isSearchSubmitted'));
  const [historyData, executeGetHistory] = useAxios(
    getHistoryApi({
      workstreamId: workStreamId,
      page: 1,
      type: 'search',
      sort: 'mostRecent',
    }),
    { manual: true },
  );
  useEffect(() => {
    executeGetHistory();
  }, [workStreamId]);

  useEffect(() => {
    if (historyData.data) {
      if (!(historyData.loading) && historyData.data.code === 200) {
        setHistory(historyData.data.data?.data);
      }
    }
  }, [historyData]);

  const getNewHistory = () => {
    if (isSearchSumbitted !== Number(localStorage.getItem('isSearchSubmitted'))) {
      executeGetHistory();
    }
  };
  const AppName = process.env.REACT_APP_NAME;
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="white"
      variant="light"
      className="app-navbar logged p-4 shadow"
    >
      <Container fluid>
        <Navbar.Brand to="/" as={Link}>
          <Image src={logo} className="d-block mx-auto me-lg-5 me-0 pe-3" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left navbar */}
          <Nav className="me-auto">
            {(role === roles.EXTERNAL_EXAMINER
              || role === roles.INTERNAL_EXAMINER) && (
              <Nav.Link
                to="dashboard"
                as={Link}
                className="appBtn has-icon btn btn-primary me-0 me-lg-5"
              >
                <BsGrid className="icon" />
                {t('navbar.dashboard')}
              </Nav.Link>
            )}
            <div className="d-lg-flex gap-2 my-3 my-lg-0 text-center">

              <MyQueriesLink />
              <MyBookmarksLink />
              <Nav.Link to={routes.myActivity} as={Link} className="has-icon">
                <BsListUl className="icon list" />
                {t('navbar.myActivity')}
              </Nav.Link>
            </div>
          </Nav>
          {/* Right navbar */}
          <Nav className="align-items-center">
            <Nav.Link
              to="/"
              as={Link}
              className="appBtn btn btn-primary me-lg-5 px-3"
            >
              {t('navbar.ipSearch')}
            </Nav.Link>
            <RecentSearch
              getNewHistory={() => { getNewHistory(); }}
            >
              {
                history.map((h) => (
                  <DropdownItem
                    query={convertQueryArrToStr(h?.payload?.qjson)}
                    timestamp={h.timestamp}
                    workStreamId={workStreamId}
                  />
                ))
              }
            </RecentSearch>
            <div className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
              <HelpLink />
              <Accessibility />
            </div>
            <div className="d-flex justify-content-center h-px-39">
              {/* Notifications */}
              { AppName === 'examiner_app'
                && <Notifications />}
              {/* Switch language */}
              <LanguageSwitch
                className={`${AppName === 'customer_app' ? 'logged-customer' : ''} pe-lg-5 me-lg-5`}
                lang={lang}
                changeLang={changeLang}
              />
              {/* Avatar & control */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  className="appBtn avatar-btn btn nav-link mx-auto"
                  size="lg"
                  id="dropdown-basic"
                >
                  <UserAvatar
                    name={user?.profile?.preferred_username}
                    size="39px"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item variant="primary" onClick={logout}>
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
  hideFocusArea: PropTypes.func.isRequired,
};
export default LoggedNavbar;
