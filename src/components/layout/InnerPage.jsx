import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function InnerPage({ children, className, dir }) {
  return (
    <Container fluid className={`${className} my-8 px-xl-24`} dir={dir}>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

InnerPage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dir: PropTypes.string,
};
InnerPage.defaultProps = {
  className: '',
  dir: '',
};

export default InnerPage;
