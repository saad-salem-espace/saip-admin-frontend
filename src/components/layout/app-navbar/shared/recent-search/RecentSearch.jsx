import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import './RecentSearch.scss';
import routes from 'components/routes/routes.json';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { LONG_DATETIME_12H_FORMAT } from '../../../../../constants';

function RecentSearch({ history, selectedWorkStream, getNewHistory }) {
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
          history.length ? (
            <>
              {
                history.map((h) => (
                  <Dropdown.Item
                    to={`${routes.search}?workstreamId=${selectedWorkStream}&sort=mostRelevant&q=${h?.payload?.query.replace(/\s/g, '+')}&page=1'`}
                    as={Link}
                    className="py-2 px-4"
                  >
                    <div className="d-flex fs-sm mb-2">
                      <RxCounterClockwiseClock className="recent-search-icon me-2" />
                      <span className="d-block text-truncate recent-search-query">{h?.payload?.query}</span>
                    </div>
                    <span className="recent-search-date fs-xs text-start d-block">
                      {Moment(h?.timestamp).format(LONG_DATETIME_12H_FORMAT)}
                    </span>
                  </Dropdown.Item>
                ))
              }
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
  history: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
      }).isRequired,
      timestamp: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedWorkStream: PropTypes.string.isRequired,
  getNewHistory: PropTypes.func.isRequired,
};

export default RecentSearch;
