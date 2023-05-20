import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const Claims = ({
  claims, children, className, isIPRExpanded,
  handleClick,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        {
          claims.map((c) => (
            <div className="d-flex align-items-center">
              <p>{c.Text}</p>
              <KeywordPlannerButton handleClick={handleClick} />
            </div>
          ))
        }

      </Col>
      {
        (children) && (
          <Col md={isIPRExpanded ? 5 : 12} className={isIPRExpanded ? 'border-start' : ''}>
            {children}
          </Col>
        )
      }
    </Row>
  </Container>
);

Claims.propTypes = {
  children: PropTypes.node,
  claims: PropTypes.string.isRequired,
  className: PropTypes.string,
  isIPRExpanded: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

Claims.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
};
export default Claims;
