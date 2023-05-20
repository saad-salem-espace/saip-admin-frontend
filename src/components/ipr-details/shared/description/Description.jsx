import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import SearchQueryMenu from 'components/ipr-details/shared/seacrh-query/SearchQueryMenu';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const Description = ({
  description, children, className, isIPRExpanded,
  hideSearchQueryMenu, showSearchQuery, ShowSearchQueryMenu,

}) => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
        <div className="d-flex align-items-center">
          <HandleEmptyAttribute checkOn={description} />
          <SearchQueryMenu
            showSearchQuery={showSearchQuery}
            hideSearchQueryMenu={hideSearchQueryMenu}
            className="ms-2"
          >
            <KeywordPlannerButton ShowSearchQueryMenu={ShowSearchQueryMenu} />
          </SearchQueryMenu>
        </div>
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
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
};

Description.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
};
export default Description;
