import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const FigurativeClassificationRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.ViennaCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.Description} /></td>
  </tr>
);

FigurativeClassificationRow.propTypes = {
  row: PropTypes.shape({
    ViennaCode: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

export default FigurativeClassificationRow;
