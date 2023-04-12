import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const OfficeActionRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.OfficeAction} /></td>
    <td><HandleEmptyAttribute checkOn={row.OfficeActionDateTime} /></td>
    <td><HandleEmptyAttribute checkOn={row.ExaminerName} /></td>
    <td><HandleEmptyAttribute checkOn={row.ExaminerDetails} /></td>
  </tr>
);

OfficeActionRow.propTypes = {
  row: PropTypes.shape({
    OfficeAction: PropTypes.string.isRequired,
    OfficeActionDateTime: PropTypes.string.isRequired,
    ExaminerName: PropTypes.string.isRequired,
    ExaminerDetails: PropTypes.string.isRequired,
  }).isRequired,
};

export default OfficeActionRow;
