import PropTypes from 'prop-types';
import Moment from 'moment';
import { LONG_DATETIME_12H_FORMAT } from '../../constants';

const SavedQueryRow = ({ query }) => {
  const queryDate = Moment(query.createdAt).format(LONG_DATETIME_12H_FORMAT);
  return (
    <tr className="text-capitalize">
      <td className="text-nowrap">{query.queryString}</td>
      <td className="text-nowrap">{queryDate}</td>
      <td>{query.resultCount}</td>
    </tr>
  );
};

SavedQueryRow.propTypes = {
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    resultCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default SavedQueryRow;
