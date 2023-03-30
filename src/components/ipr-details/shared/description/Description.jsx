import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Description = ({ description, children }) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={children ? 8 : 12} md={6}>
        <p>{description}</p>
      </Col>
      {
        children && (
          <Col lg={4} md={6}>
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
};

Description.defaultProps = {
  children: null,
};
export default Description;
