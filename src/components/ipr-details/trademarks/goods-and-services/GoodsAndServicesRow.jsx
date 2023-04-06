import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const GoodsAndServicesRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.NICEClassification} /></td>
    <td><HandleEmptyAttribute checkOn={row.GoodsAndServices} /></td>
  </tr>
);

GoodsAndServicesRow.propTypes = {
  row: PropTypes.shape({
    NICEClassification: PropTypes.string.isRequired,
    GoodsAndServices: PropTypes.string.isRequired,
  }).isRequired,
};

export default GoodsAndServicesRow;
