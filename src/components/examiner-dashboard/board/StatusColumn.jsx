import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import './board.scss';
import PatentCard from './PatentCard';

function StatusColumn({
  status, className, data, setActiveDocument, setToggle,
}) {
  const pinned = !!data.length;
  const others = !!data.length;
  return (
    <Col md={6} lg={4} xl={3} className="mb-5">
      <p className={`${className} h-px-24 border-start border-3 text-uppercase ps-3`}>
        {status}
        <Badge varient="primary-10" className="ms-2 text-primary p-2" text={data.length} />
      </p>
      <div className="cards-container bg-gray-200 px-3 py-5">
        { pinned && (
          <p className="text-primary-dark fs-14 fw-bold">Pinned</p>
        )}
        {data.map((assignment) => (
          assignment.pinned
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
          />
        ))}
        { others && (
          <p className="text-primary-dark fs-14 fw-bold">Others</p>
        )}
        {data.map((assignment) => (
          !(assignment.pinned)
          && <PatentCard
            assignment={assignment}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
          />
        ))}
      </div>
    </Col>
  );
}

StatusColumn.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
};

export default StatusColumn;
