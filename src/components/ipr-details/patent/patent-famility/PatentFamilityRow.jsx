import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const PatentFamilityRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row?.PublicationNumber} /></td>
    <td><HandleEmptyAttribute checkOn={row?.PublicationDate} /></td>
    <td><HandleEmptyAttribute checkOn={row?.ApplicationTitle} /></td>
    <td><HandleEmptyAttribute checkOn={row?.ApplicationNumber} /></td>
    <td><HandleEmptyAttribute checkOn={row?.Applicants.join('; ')} /></td>
  </tr>
);

PatentFamilityRow.propTypes = {
  row: PropTypes.shape({
    PublicationNumber: PropTypes.string.isRequired,
    PublicationDate: PropTypes.string.isRequired,
    ApplicationTitle: PropTypes.string.isRequired,
    ApplicationNumber: PropTypes.string.isRequired,
    Applicants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PatentFamilityRow;
