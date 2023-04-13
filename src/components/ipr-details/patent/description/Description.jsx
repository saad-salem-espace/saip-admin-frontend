import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Description = ({
  description, children, className, isIPRExpanded,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        <p className="text-gray">{description.TechnicalField.Title}</p>
        <p>{description.TechnicalField.Paragraphs.join('; ')}</p>
        <p className="text-gray">{description.BackgroundArt.Title}</p>
        <p>{description.BackgroundArt.Paragraphs.join('; ')}</p>
        <p className="text-gray">{description.Disclosure.Title}</p>
        <p>{description.Disclosure.Paragraphs.join('; ')}</p>
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
