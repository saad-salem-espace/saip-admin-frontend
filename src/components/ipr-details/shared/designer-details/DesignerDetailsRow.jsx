import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const DesignerDetailsRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.DesignerName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Nationality} /></td>
    <td><HandleEmptyAttribute checkOn={row.DesignerDetails} /></td>
  </tr>
);

DesignerDetailsRow.propTypes = {
  row: PropTypes.shape({
    DesignerName: PropTypes.string.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Nationality: PropTypes.string.isRequired,
    DesignerDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default DesignerDetailsRow;
