import PropTypes from 'prop-types';
import Moment from 'moment';
import { useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';
import { LONG_DATETIME_12H_FORMAT } from '../../constants';
import './style.scss';

const SavedQueryRow = ({ query, selectedWorkStream }) => {
  const queryDate = Moment(query.createdAt).format(LONG_DATETIME_12H_FORMAT);
  const queryStringUrl = query.queryString.replace(/\s/g, '+');
  const [selectedLink, setSelectedLink] = useState(false);

  return (
    <tr className="text-capitalize">
      <td className="text-nowrap">{query.queryString}</td>
      <td className="text-nowrap">{queryDate}</td>
      <td>{query.resultCount}</td>
      <td className="d-flex">
        <Link
          className={`p-2 rounded run-query ${selectedLink === query.queryString ? 'active-query' : ''}`}
          to={`/search?workstreamId=${selectedWorkStream}&sort=mostRelevant&q=${queryStringUrl}&page=1'`}
          onClick={() => setSelectedLink(query.queryString)}
        >
          <BsPlay className="play-icon fs-base" />
        </Link>
      </td>
    </tr>
  );
};

SavedQueryRow.propTypes = {
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    resultCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  selectedWorkStream: PropTypes.number.isRequired,
};

export default SavedQueryRow;
