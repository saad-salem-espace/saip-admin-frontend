import PropTypes from 'prop-types';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const LabelValue = ({
  label, value, handleClick,
  className,
}) => (
  <div className={`${className}`}>
    {label && (
    <p className="text-gray disable-highlight">{label}</p>
    )}
    <div className="d-flex align-items-center">
      <p>
        {value}
        <KeywordPlannerButton handleClick={handleClick} />
      </p>
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
