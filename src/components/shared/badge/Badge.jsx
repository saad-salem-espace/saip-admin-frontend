import PropTypes from 'prop-types';
import BootstrapBadge from 'react-bootstrap/Badge';
import './badge.scss';

function Badge({
  text,
  className,
}) {
  return (
    <BootstrapBadge className={`${className}`}>
      { text }
    </BootstrapBadge>
  );
}

Badge.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {
  className: '',
};

export default Badge;
