import { useAuth } from 'react-oidc-context';
import PropTypes from 'prop-types';
import LoggedNavbar from './LoggedNavbar';
import GuestNavbar from './GuestNavbar';

import './AppNavbar.scss';

function AppNavbar({
  lang, changeLang, hideFocusArea,
}) {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return (
      <LoggedNavbar
        lang={lang}
        changeLang={changeLang}
        hideFocusArea={hideFocusArea}
      />
    );
  }
  return (
    <GuestNavbar lang={lang} changeLang={changeLang} />
  );
}

AppNavbar.propTypes = {
  changeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  hideFocusArea: PropTypes.func.isRequired,
};
export default AppNavbar;
