import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const InventorRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.InventorName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Naionality} /></td>
    <td><HandleEmptyAttribute checkOn={row.InventorDetails.join('; ')} /></td>
  </tr>
);

InventorRow.propTypes = {
  row: PropTypes.shape({
    InventorName: PropTypes.number.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Naionality: PropTypes.string.isRequired,
    InventorDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default InventorRow;
