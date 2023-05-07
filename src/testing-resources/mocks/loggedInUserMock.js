import internalUser from 'testing-resources/users/internalUser.json';
import externalUser from 'testing-resources/users/externalUser.json';

const userTypes = {
  internalUser: Symbol('INTERNAL_USER'),
  externalUser: Symbol('EXTERNAL_USER'),
};

const loggedInUserMock = (userType) => {
  let user;
  switch (userType) {
    case userTypes.internalUser:
      user = internalUser;
      break;
    case userTypes.externalUser:
      user = externalUser;
      break;
    default:
      user = undefined;
  }
  if (user) user.expires_at = Math.round(Date.now() / 1000) + 30 * 60;
  return user;
};

export { loggedInUserMock, userTypes };
