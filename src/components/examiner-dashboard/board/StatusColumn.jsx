import { Col, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './board.scss';

function StatusColumn({
  status, className, count, children,
}) {
  // const pinned = true;
  return (
    <Col md={6} lg={3}>
      <p className={`${className} h-24 border-start border-3 text-uppercase ps-3`}>
        {status}
        <Badge bg="primary-10" className="ms-2 text-primary p-2">{count}</Badge>
      </p>
      <div className="cards-container bg-gray-200 px-3 py-5">
        {/* <p className="text-primary-dark fs-14 fw-bold">Pinned</p> */}
        {children}
      </div>
    </Col>
  );
}

StatusColumn.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StatusColumn;
