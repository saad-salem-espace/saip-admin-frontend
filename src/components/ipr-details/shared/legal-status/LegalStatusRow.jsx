import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const LegalStatusRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.StatusCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Status} /></td>
    <td><HandleEmptyAttribute checkOn={row.StatusDate} /></td>
    <td><HandleEmptyAttribute checkOn={row.EffectiveDate} /></td>
    <td><HandleEmptyAttribute checkOn={row.Notes} /></td>
  </tr>
);

LegalStatusRow.propTypes = {
  row: PropTypes.shape({
    Status: PropTypes.string.isRequired,
    StatusDate: PropTypes.string.isRequired,
    EffectiveDate: PropTypes.string.isRequired,
    StatusCode: PropTypes.string.isRequired,
    Notes: PropTypes.string.isRequired,
  }).isRequired,
};

export default LegalStatusRow;
