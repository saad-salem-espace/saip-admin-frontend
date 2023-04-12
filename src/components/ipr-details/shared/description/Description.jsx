import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const Description = ({
  description, children, className, isIPRExpanded,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        <HandleEmptyAttribute checkOn={description} />
      </Col>
      {
       (children) && (
       <Col lg={5} md={6}>
         {children}
       </Col>
       )
      }
    </Row>
  </Container>
);

Description.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  isIPRExpanded: PropTypes.bool,
};

Description.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
};
export default Description;
