import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const ExhibitionRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.ExhibitionName} /></td>
    <td><HandleEmptyAttribute checkOn={row.ExihibitionDate} /></td>
    <td><HandleEmptyAttribute checkOn={row.ExibitionDetails} /></td>
    {/* will use the blow line after some changes in the backend */}
    {/* <td><HandleEmptyAttribute checkOn={row.ExibitionDetails.join('; ')} /></td> */}
  </tr>
);

ExhibitionRow.propTypes = {
  row: PropTypes.shape({
    ExhibitionName: PropTypes.string.isRequired,
    ExihibitionDate: PropTypes.string.isRequired,
    ExibitionDetails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ExhibitionRow;
