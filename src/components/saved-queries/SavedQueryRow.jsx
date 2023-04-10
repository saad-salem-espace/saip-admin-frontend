import PropTypes from 'prop-types';

const SavedQueryRow = ({ query }) => (
  <tr className="text-capitalize">
    <td>{query.queryString}</td>
    <td>{query.createdAt}</td>
    <td>{query.resultCount}</td>
  </tr>
);

SavedQueryRow.propTypes = {
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    resultCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default SavedQueryRow;
