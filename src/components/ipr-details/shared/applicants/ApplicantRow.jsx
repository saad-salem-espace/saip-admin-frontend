import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const ApplicantRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.ApplicantName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Nationality} /></td>
    <td><HandleEmptyAttribute checkOn={row.ApplicantDetails} /></td>
  </tr>
);

ApplicantRow.propTypes = {
  row: PropTypes.shape({
    ApplicantName: PropTypes.string.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Nationality: PropTypes.string.isRequired,
    ApplicantDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ApplicantRow;
