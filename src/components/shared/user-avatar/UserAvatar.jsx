import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import './UserAvatar.scss';

function UserAvatar({
  name,
  size,
  color,
  round,
  fgColor,
}) {
  return (
    <Avatar name={name} size={size} color={color} round={round} fgColor={fgColor} />
  );
}
UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  round: PropTypes.bool,
  color: PropTypes.string,
  fgColor: PropTypes.string,
};

UserAvatar.defaultProps = {
  fgColor: '',
  color: '',
  size: '39px',
  round: true,
};

export default UserAvatar;
