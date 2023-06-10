import Dropdown from 'react-bootstrap/Dropdown';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import './RecentSearch.scss';
import routes from 'components/routes/routes.json';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { LONG_DATETIME_12H_FORMAT } from '../../../../../constants';

function DropdownItem({ query, workStreamId, timestamp }) {
  return (
    <Dropdown.Item
      to={`${routes.search}?workstreamId=${workStreamId}&sort=mostRelevant&q=${query.replace(/\s/g, '+')}&page=1'`}
      as={Link}
      className="py-2 px-4"
    >
      <div className="d-flex fs-sm mb-2">
        <RxCounterClockwiseClock className="recent-search-icon me-2" />
        <span className="d-block text-truncate recent-search-query">{query}</span>
      </div>
      <span className="recent-search-date fs-xs text-start d-block">
        {Moment(timestamp).format(LONG_DATETIME_12H_FORMAT)}
      </span>
    </Dropdown.Item>
  );
}

DropdownItem.propTypes = {
  timestamp: PropTypes.string.isRequired,
  workStreamId: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};

export default DropdownItem;
