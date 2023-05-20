import PropTypes from 'prop-types';
import SearchQueryMenu from 'components/ipr-details/shared/seacrh-query/SearchQueryMenu';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value, showSearchQuery, hideSearchQueryMenu, ShowSearchQueryMenu,
  className,
}) => (
  <div className={`${className}`}>
    {label && (
    <p className="text-gray">{label}</p>
    )}
    <div className="d-flex align-items-center">
      <p>{value}</p>
      <SearchQueryMenu
        showSearchQuery={showSearchQuery}
        hideSearchQueryMenu={hideSearchQueryMenu}
        className="mb-4 ms-2"
      >
        <KeywordPlannerButton ShowSearchQueryMenu={ShowSearchQueryMenu} />
      </SearchQueryMenu>
    </div>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LabelValue.defaultProps = {
  className: '',
};
export default LabelValue;
