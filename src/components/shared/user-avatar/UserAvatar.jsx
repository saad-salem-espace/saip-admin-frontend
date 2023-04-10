import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import './UserAvatar.scss';

function UserAvatar({
  name,
  size,
  round,
}) {
  return (
    <Avatar name={name} size={size} round={round} />
  );
}
UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  round: PropTypes.bool,
};

UserAvatar.defaultProps = {
  size: '39px',
  round: true,
};

export default UserAvatar;
