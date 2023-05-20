import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LabelValue from './LabelValue';

const Description = ({
  description, children, className, isIPRExpanded, handleClick,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        <LabelValue
          label={description?.TechnicalField?.Title}
          value={description?.TechnicalField?.Paragraphs?.join('; ')}
          handleClick={handleClick}
        />
        <LabelValue
          label={description.BackgroundArt.Title}
          value={description?.BackgroundArt?.Paragraphs?.join('; ')}
          handleClick={handleClick}
        />
        <LabelValue
          label={description.Disclosure.Title}
          value={description?.Disclosure?.Paragraphs?.join('; ')}
          handleClick={handleClick}
        />
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
  handleClick: PropTypes.func.isRequired,
};

Description.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
};
export default Description;
