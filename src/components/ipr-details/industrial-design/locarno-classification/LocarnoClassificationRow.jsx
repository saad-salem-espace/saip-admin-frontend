import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const LocarnoClassificationRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.LocarnoClassification} /></td>
    <td><HandleEmptyAttribute checkOn={row.IndicationofDesign} /></td>
  </tr>
);

LocarnoClassificationRow.propTypes = {
  row: PropTypes.shape({
    LocarnoClassification: PropTypes.string.isRequired,
    IndicationofDesign: PropTypes.string.isRequired,
  }).isRequired,
};

export default LocarnoClassificationRow;
