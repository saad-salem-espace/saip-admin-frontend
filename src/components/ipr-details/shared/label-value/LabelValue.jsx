import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import style from 'components/ipr-details/ipr-details.module.scss';
import SearchQueryMenu from 'components/ipr-details/shared/seacrh-query/SearchQueryMenu';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value, showSearchQuery, hideSearchQueryMenu, ShowSearchQueryMenu,
  toggleIcon, upArrow, labelClassName,
  className, customLabel, valueClassName,
}) => (
  <div className={`d-flex align-items-center ${className}`}>
    {label && (
    <p className={`${customLabel ? '' : 'text-primary f-14'} ${labelClassName} ${style.label}`}>{label}</p>
    )}
    <p className={`f-12 ${valueClassName}`}>
      <HandleEmptyAttribute checkOn={value} />
    </p>
    <SearchQueryMenu
      showSearchQuery={showSearchQuery}
      hideSearchQueryMenu={hideSearchQueryMenu}
      className="mb-4 ms-2"
      toggleIcon={toggleIcon}
      upArrow={upArrow}
    >
      <KeywordPlannerButton ShowSearchQueryMenu={ShowSearchQueryMenu} />
    </SearchQueryMenu>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  customLabel: PropTypes.bool,
  valueClassName: PropTypes.string,
  toggleIcon: PropTypes.func.isRequired,
  upArrow: PropTypes.bool.isRequired,
  labelClassName: PropTypes.string,
};

LabelValue.defaultProps = {
  className: '',
  customLabel: false,
  valueClassName: '',
  labelClassName: '',
};
export default LabelValue;
