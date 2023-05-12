import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const IndicationOfDesignRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.locarnoClassification} /></td>
    <td><HandleEmptyAttribute checkOn={row.description} /></td>
  </tr>
);

IndicationOfDesignRow.propTypes = {
  row: PropTypes.shape({
    description: PropTypes.string.isRequired,
    locarnoClassification: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndicationOfDesignRow;
