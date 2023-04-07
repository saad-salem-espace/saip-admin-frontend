const Role = Object.freeze({
  Admin: 'Platform_Administrator',
  Internal_Examiner: 'Internal_Examiner',
  External_Examiner: 'External_Examiner',
  Registered_User: 'Registered_User',
  Public_User: 'Public_User',
});

export default function roleMapper(roleCode) {
  let role = '';
  switch (roleCode) {
    case 'C02:R500:SAIP:IPSRCH:SA:PLADM:G0ZZ:1.00':
      role = Role.Admin;
      break;
    case 'C02:R501:SAIP:IPSRCH:BU:INEXM:G0ZZ:1.00':
      role = Role.Internal_Examiner;
      break;
    case 'C02:R502:SAIP:IPSRCH:BU:EXEXM:G0ZZ:1.00':
      role = Role.External_Examiner;
      break;
    case 'C02:R503:SAIP:IPSRCH:BU:RGUSR:G0ZZ:1.00':
      role = Role.Registered_User;
      break;
    default:
      role = Role.Public_User;
  }
  return role;
}
