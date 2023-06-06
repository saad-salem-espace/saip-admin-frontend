import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';
import routes from 'components/routes/routes.json';

const QueryRow = ({
  query, selectedWorkStream,
}) => (
  <tr className="text-capitalize">
    <td className="text-nowrap query">{query}</td>
    <td>
      <Link
        className="p-2 rounded run-query"
        to={`${routes.search}?workstreamId=${selectedWorkStream}&sort=mostRelevant&q=${query}&page=1'`}
      >
        <BsPlay className="play-icon fs-base" />
      </Link>
    </td>
  </tr>
);
QueryRow.propTypes = {
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    resultCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  selectedWorkStream: PropTypes.number.isRequired,
};

export default QueryRow;
