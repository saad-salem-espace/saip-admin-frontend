import Dropdown from 'react-bootstrap/Dropdown';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { Link, createSearchParams } from 'react-router-dom';
import './RecentSearch.scss';
import routes from 'components/routes/routes.json';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { LONG_DATETIME_12H_FORMAT } from '../../../../../constants';

function DropdownItem({ query, workStreamId, timestamp }) {
  const writeHistory = (row) => {
    if (row?.query && row?.imageName) return (`${row.query} OR ${row.imageName}`);
    if (row?.query) return row.query;
    return row.imageName;
  };

  return (
    <Dropdown.Item
      to={{
        pathname: routes.search,
        search: `?${createSearchParams({
          workstreamId: workStreamId,
          sort: 'mostRelevant',
          ...(query?.query && { q: query.query }),
          ...(query?.imageName && { imageName: query.imageName }),
          ...(query?.docImage && { docImage: query.docImage }),
        })}`,
      }}
      as={Link}
      className="py-2 px-4"
    >
      <div className="d-flex fs-sm mb-2">
        <RxCounterClockwiseClock className="recent-search-icon me-2" />
        <span className="d-block text-truncate recent-search-query">{writeHistory(query)}</span>
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
