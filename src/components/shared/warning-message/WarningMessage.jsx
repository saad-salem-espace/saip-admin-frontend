import PropTypes from 'prop-types';

function WarningMessage({
  msg, className,
}) {
  return (
    <p className={`text-warning fs-sm ${className}`}>{msg}</p>
  );
}

WarningMessage.propTypes = {
  msg: PropTypes.string.isRequired,
  className: PropTypes.string,
};

WarningMessage.defaultProps = {
  className: '',
};

export default WarningMessage;
