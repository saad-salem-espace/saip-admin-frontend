import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/Button';

function Button({
  text,
  size,
  onClick,
  disabled,
  variant,
  type,
  className,
  ...props
}) {
  return (
    <BootstrapButton
      {...(onClick && { onClick })}
      disabled={disabled}
      size={size}
      variant={variant}
      type={type}
      className={`appBtn ${className}`}
      {...props}
    >
      { text }
    </BootstrapButton>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
Button.defaultProps = {
  size: 'lg',
  onClick: null,
  disabled: false,
  variant: '',
  type: 'button',
  className: '',
};

export default Button;
