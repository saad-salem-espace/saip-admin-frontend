import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const OwnerRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.OwnerName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Naionality} /></td>
    <td><HandleEmptyAttribute checkOn={row.OwnerDetails} /></td>
    {/* will use the blow line after some changes in the backend */}
    {/* <td><HandleEmptyAttribute checkOn={row.OwnerDetails.join('; ')} /></td> */}
  </tr>
);

OwnerRow.propTypes = {
  row: PropTypes.shape({
    OwnerName: PropTypes.string.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Naionality: PropTypes.string.isRequired,
    OwnerDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default OwnerRow;
