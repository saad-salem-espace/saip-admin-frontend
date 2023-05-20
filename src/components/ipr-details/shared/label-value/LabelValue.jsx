import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import style from 'components/ipr-details/ipr-details.module.scss';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value, ShowSearchQueryMenu,
  labelClassName,
  className, customLabel, valueClassName,
}) => (
  <div className={`d-flex align-items-center ${className}`}>
    {label && (
    <p className={`${customLabel ? '' : 'text-primary f-14'} ${labelClassName} ${style.label}`}>{label}</p>
    )}
    <p className={`f-12 ${valueClassName}`}>
      <HandleEmptyAttribute checkOn={value} />
    </p>
    <KeywordPlannerButton ShowSearchQueryMenu={ShowSearchQueryMenu} />
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  customLabel: PropTypes.bool,
  valueClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

LabelValue.defaultProps = {
  className: '',
  customLabel: false,
  valueClassName: '',
  labelClassName: '',
};
export default LabelValue;
