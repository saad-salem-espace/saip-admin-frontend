import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchQueryMenu from 'components/ipr-details/shared/seacrh-query/SearchQueryMenu';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const Claims = ({
  claims, children, className, isIPRExpanded,
  showSearchQuery, hideSearchQueryMenu, ShowSearchQueryMenu,
}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        {
          claims.map((c) => (
            <div className="d-flex align-items-center">
              <p>{c.Text}</p>
              <SearchQueryMenu
                showSearchQuery={showSearchQuery}
                hideSearchQueryMenu={hideSearchQueryMenu}
                className="mb-4 ms-2"
              >
                <KeywordPlannerButton ShowSearchQueryMenu={ShowSearchQueryMenu} />
              </SearchQueryMenu>
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
  showSearchQuery: PropTypes.bool,
  hideSearchQueryMenu: PropTypes.func,
  ShowSearchQueryMenu: PropTypes.func,
};

Claims.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
  hideSearchQueryMenu: () => { },
  ShowSearchQueryMenu: () => { },
  showSearchQuery: false,
};
export default Claims;
