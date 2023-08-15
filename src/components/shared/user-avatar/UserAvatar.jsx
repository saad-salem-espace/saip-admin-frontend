import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import './UserAvatar.scss';

function UserAvatar({
  name,
  size,
  round,
  className,
}) {
  return (
    <Avatar name={name} size={size} round={round} className={className} />
  );
}
UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  round: PropTypes.bool,
  className: PropTypes.string,
};

UserAvatar.defaultProps = {
  size: '39px',
  round: true,
  className: null,
};

export default UserAvatar;
