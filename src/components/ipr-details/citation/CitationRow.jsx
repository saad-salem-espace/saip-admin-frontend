import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CitationRow = ({ row }) => (
  <tr className="text-capitalize">
    <td>{row.citationOrigin}</td>
    <td>
      <Link
        to={row.publicationURL}
      >
        {row.publication}
      </Link>
    </td>
    <td>{row.title}</td>
    <td>{row.priorityDate}</td>
    <td>{row.publicationDate}</td>
    <td>{row.applicants}</td>
    <td>{row.IPC}</td>
    <td>{row.CPC}</td>
  </tr>
);

CitationRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    citationOrigin: PropTypes.string.isRequired,
    publication: PropTypes.string.isRequired,
    publicationURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priorityDate: PropTypes.string.isRequired,
    publicationDate: PropTypes.string.isRequired,
    applicants: PropTypes.string.isRequired,
    IPC: PropTypes.string,
    CPC: PropTypes.string,
  }).isRequired,
};

export default CitationRow;
