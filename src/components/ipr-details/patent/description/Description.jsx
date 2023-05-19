import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LabelValue from './LabelValue';

const Description = ({
  description, children, className, isIPRExpanded,
  hideSearchQueryMenu, showSearchQuery, ShowSearchQueryMenu,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        <LabelValue
          label={description?.TechnicalField?.Title}
          value={description?.TechnicalField?.Paragraphs?.join('; ')}
          hideSearchQueryMenu={hideSearchQueryMenu}
          showSearchQuery={showSearchQuery}
          ShowSearchQueryMenu={ShowSearchQueryMenu}
        />
        <LabelValue
          label={description.BackgroundArt.Title}
          value={description?.BackgroundArt?.Paragraphs?.join('; ')}
          hideSearchQueryMenu={hideSearchQueryMenu}
          showSearchQuery={showSearchQuery}
          ShowSearchQueryMenu={ShowSearchQueryMenu}
        />
        <LabelValue
          label={description.Disclosure.Title}
          value={description?.Disclosure?.Paragraphs?.join('; ')}
          hideSearchQueryMenu={hideSearchQueryMenu}
          showSearchQuery={showSearchQuery}
          ShowSearchQueryMenu={ShowSearchQueryMenu}
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
  showSearchQuery: PropTypes.bool,
  hideSearchQueryMenu: PropTypes.func,
  ShowSearchQueryMenu: PropTypes.func,
};

Description.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
  hideSearchQueryMenu: () => { },
  ShowSearchQueryMenu: () => { },
  showSearchQuery: false,
};
export default Description;
