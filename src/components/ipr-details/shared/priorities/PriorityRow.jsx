import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const PriorityRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.PriorityNumber} /></td>
    <td><HandleEmptyAttribute checkOn={row.PriorityDate} /></td>
    <td><HandleEmptyAttribute checkOn={row.PriorityCountry} /></td>
  </tr>
);

PriorityRow.propTypes = {
  row: PropTypes.shape({
    PriorityNumber: PropTypes.string.isRequired,
    PriorityDate: PropTypes.string.isRequired,
    PriorityCountry: PropTypes.string.isRequired,
  }).isRequired,
};

export default PriorityRow;
