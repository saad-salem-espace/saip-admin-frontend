import PropTypes from 'prop-types';

const LabelValue = ({
  label, value,
  className,
}) => (
  <div className={`${className}`}>
    {label && (
    <p className="text-gray disable-highlight">{label}</p>
    )}
    <div className="d-flex align-items-center">
      <p>
        {value}
      </p>
    </div>
  </div>
);

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LabelValue.defaultProps = {
  className: '',
};
export default LabelValue;
