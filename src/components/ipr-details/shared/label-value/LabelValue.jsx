import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import style from 'components/ipr-details/ipr-details.module.scss';

const LabelValue = ({
  label, value,
  labelClassName,
  className, customLabel, valueClassName,
}) => (
  <div className={`d-flex align-items-start ${className}`}>
    {label && (
    <p className={`${customLabel ? '' : 'app-text-primary f-14'}  ${style.label} ${labelClassName} disable-highlight`}>{label}</p>
    )}
    <p className={`fs-sm ${valueClassName}`}>
      <HandleEmptyAttribute checkOn={value} />
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
};

LabelValue.defaultProps = {
  className: '',
  customLabel: false,
  valueClassName: '',
  labelClassName: '',
};
export default LabelValue;
