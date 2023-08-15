const roles = Object.freeze({
  ADMIN: Symbol('ADMIN'),
  INTERNAL_EXAMINER: Symbol('INTERNAL_EXAMINER'),
  EXTERNAL_EXAMINER: Symbol('EXTERNAL_EXAMINER'),
  REGISTERED_USER: Symbol('REGISTERED_USER'),
  PUBLIC_USER: Symbol('PUBLIC_USER'),
});

const roleMapper = (roleCode) => {
  let role = null;
  switch (roleCode) {
    case 'C02:R500:SAIP:IPSRCH:SA:PLADM:G0ZZ:1.00':
      role = roles.ADMIN;
      break;
    case 'C02:R501:SAIP:IPSRCH:BU:INEXM:G0ZZ:1.00':
      role = roles.INTERNAL_EXAMINER;
      break;
    case 'C02:R502:SAIP:IPSRCH:BU:EXEXM:G0ZZ:1.00':
      role = roles.EXTERNAL_EXAMINER;
      break;
    case 'C02:R503:SAIP:IPSRCH:BU:RGUSR:G0ZZ:1.00':
      role = roles.REGISTERED_USER;
      break;
    default:
      role = roles.PUBLIC_USER;
  }
  return role;
};

export { roleMapper, roles };
