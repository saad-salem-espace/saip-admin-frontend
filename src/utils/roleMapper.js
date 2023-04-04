export default function roleMapper(roleCode) {
  let role = '';
  switch (roleCode) {
    case 'C02:R500:SAIP:IPSRCH:SA:PLADM:G0ZZ:1.00':
      role = 'Platform_Administrator';
      break;
    case 'C02:R501:SAIP:IPSRCH:BU:INEXM:G0ZZ:1.00':
      role = 'Internal_Examiner';
      break;
    case 'C02:R502:SAIP:IPSRCH:BU:EXEXM:G0ZZ:1.00':
      role = 'External_Examiner';
      break;
    case 'C02:R503:SAIP:IPSRCH:BU:RGUSR:G0ZZ:1.00':
      role = 'Registered_User';
      break;
    default:
      // code block
  }
  return role;
}
