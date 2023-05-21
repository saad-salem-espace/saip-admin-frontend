import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import style from 'components/ipr-details/ipr-details.module.scss';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value,
  labelClassName,
  className, customLabel, valueClassName, btnPosition,
  handleClick,
}) => (
  <div className={`d-flex align-items-center ${className}`}>
    {label && (
    <p className={`${customLabel ? '' : 'text-primary f-14'} ${labelClassName} ${style.label} disable-highlight`}>{label}</p>
    )}
    <p className={`f-12 ${valueClassName}`}>
      <HandleEmptyAttribute checkOn={value} />
      <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
    </p>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  className: PropTypes.string,
  customLabel: PropTypes.bool,
  valueClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  handleClick: PropTypes.func,
  btnPosition: PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }).isRequired,
};

LabelValue.defaultProps = {
  className: '',
  customLabel: false,
  valueClassName: '',
  labelClassName: '',
  handleClick: () => {},
};
export default LabelValue;
