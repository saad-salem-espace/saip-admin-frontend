import PropTypes from 'prop-types';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value, handleClick,
  className,
}) => (
  <div className={`${className}`}>
    {label && (
    <p className="text-gray">{label}</p>
    )}
    <div className="d-flex align-items-center">
      <p>{value}</p>
      <KeywordPlannerButton handleClick={handleClick} />
    </div>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LabelValue.defaultProps = {
  className: '',
};
export default LabelValue;
