import PropTypes from 'prop-types';

function ErrorMessage({
  msg, className,
}) {
  return (
    <p className={`text-danger f-14 ${className}`}>{msg}</p>
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
