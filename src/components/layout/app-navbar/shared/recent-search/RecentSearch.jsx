import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import './RecentSearch.scss';
import routes from 'components/routes/routes.json';
import PropTypes from 'prop-types';

function RecentSearch({
  getNewHistory, children,
}) {
  const { t } = useTranslation('layout');
  return (
    <Dropdown
      className="recent-search"
      onClick={getNewHistory}
    >
      <Dropdown.Toggle
        variant="link"
        className="app-bg-primary-01 appBtn has-icon btn nav-link mx-auto my-3 my-lg-0 rounded"
        size="lg"
        id="recent-search"
      >
        <RxCounterClockwiseClock className="icon app-text-primary" />
        <span className="app-text-primary-dark">{t('navbar.recentSearch')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        {
          children ? (
            <>
              {children}
              <Dropdown.Item to={routes.viewHistory} as={Link} className="no-history text-center fs-sm py-4">{t('navbar.viewAllHistory')}</Dropdown.Item>
            </>) : (
              <p className="mb-0 px-4 py-6 text-gray text-center fs-sm">{t('navbar.noSearchHistory')}</p>
          )
        }
      </Dropdown.Menu>

    </Dropdown>
  );
}

RecentSearch.propTypes = {
  getNewHistory: PropTypes.func.isRequired,
  children: PropTypes.node,
};

RecentSearch.defaultProps = {
  children: null,
};

export default RecentSearch;
