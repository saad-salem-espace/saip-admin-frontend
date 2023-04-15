import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const RepresentativeRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.RepresentativeName} /></td>
    <td><HandleEmptyAttribute checkOn={row.CountryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Naionality} /></td>
    <td><HandleEmptyAttribute checkOn={row.RepresentativeDetails} /></td>
  </tr>
);

RepresentativeRow.propTypes = {
  row: PropTypes.shape({
    RepresentativeName: PropTypes.string.isRequired,
    CountryCode: PropTypes.string.isRequired,
    Naionality: PropTypes.string.isRequired,
    RepresentativeDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default RepresentativeRow;
