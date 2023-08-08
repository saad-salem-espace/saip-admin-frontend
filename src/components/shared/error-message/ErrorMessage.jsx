import PropTypes from 'prop-types';

function ErrorMessage({
  msg, className,
}) {
  return (
    <p className={`app-text-danger fs-sm ${className}`}>{msg}</p>
  );
}

ErrorMessage.propTypes = {
  msg: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  className: '',
};

export default ErrorMessage;
