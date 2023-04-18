import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const OwnerRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.OwnerName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Naionality} /></td>
    <td><HandleEmptyAttribute checkOn={row.OwnerDetails} /></td>
  </tr>
);

OwnerRow.propTypes = {
  row: PropTypes.shape({
    OwnerName: PropTypes.string.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Naionality: PropTypes.string.isRequired,
    OwnerDetails: PropTypes.string.isRequired,
  }).isRequired,
};

export default OwnerRow;
