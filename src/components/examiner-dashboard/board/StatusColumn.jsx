import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import './board.scss';

function StatusColumn({
  status, className, count, children,
}) {
  const pinned = false;
  const others = false;
  return (
    <Col md={6} lg={4} xl={3} className="mb-5">
      <p className={`${className} h-px-24 border-start border-3 text-uppercase ps-3`}>
        {status}
        <Badge varient="primary-10" className="ms-2 text-primary p-2" text={count} />
      </p>
      <div className="cards-container bg-gray-200 px-3 py-5">
        { pinned && (
          <p className="text -primary-dark fs-14 fw-bold">Pinned</p>
        )}
        { others && (
          <p className="text -primary-dark fs-14 fw-bold">Others</p>
        )}
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
