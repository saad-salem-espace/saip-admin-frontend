import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CitationRow = ({ row }) => (
  <tr>
    <td className="align-middle text-capitalize">{row.citationOrigin}</td>
    <td className="align-middle text-capitalize">
      <Link
        to={row.publicationURL}
      >
        {row.publication}
      </Link>
    </td>
    <td className="align-middle text-capitalize">{row.title}</td>
    <td className="align-middle text-capitalize">{row.priorityDate}</td>
    <td className="align-middle text-capitalize">{row.publicationDate}</td>
    <td className="align-middle text-capitalize">{row.applicants}</td>
    <td className="align-middle text-capitalize">{row.IPC}</td>
    <td className="align-middle text-capitalize">{row.CPC}</td>
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
