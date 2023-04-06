import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const CitationRow = ({ row }) => (
  <tr className="text-capitalize">
    <td><HandleEmptyAttribute checkOn={row.Type} /></td>
    <td><HandleEmptyAttribute checkOn={row.CitationOriginCoutryCode} /></td>
    <td><HandleEmptyAttribute checkOn={row.PublicationNumber} /></td>
    <td><HandleEmptyAttribute checkOn={row.PublicationDate} /></td>
    <td><HandleEmptyAttribute checkOn={row.PublicationTitle} /></td>
    <td><HandleEmptyAttribute checkOn={row.Applicants.join('; ')} /></td>
    <td><HandleEmptyAttribute checkOn={row.EarliestPriorityDate} /></td>
  </tr>
);

CitationRow.propTypes = {
  row: PropTypes.shape({
    Type: PropTypes.string,
    CitationOriginCoutryCode: PropTypes.string.isRequired,
    PublicationNumber: PropTypes.string.isRequired,
    PublicationDate: PropTypes.string.isRequired,
    PublicationTitle: PropTypes.string.isRequired,
    Applicants: PropTypes.arrayOf(PropTypes.string),
    EarliestPriorityDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default CitationRow;
