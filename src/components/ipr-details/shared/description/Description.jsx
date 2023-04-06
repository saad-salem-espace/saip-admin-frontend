import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';

const Description = ({ description, children, className }) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={children ? 8 : 12} md={6} className={className}>
        <HandleEmptyAttribute checkOn={description} />
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
  className: PropTypes.string,
};

Description.defaultProps = {
  children: null,
  className: '',
};
export default Description;
