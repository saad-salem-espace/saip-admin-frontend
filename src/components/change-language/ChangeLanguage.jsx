import Button from 'components/shared/button/Button';
import React, {
  useContext,
} from 'react';
import { ThemeContext } from 'components/theme/ThemeProvider';
import PropTypes from 'prop-types';

function ChangeLanguage({ changeLang }) {
  const lang = useContext(ThemeContext).language;
  const changeDirection = () => {
    const wrapperElement = document.getElementsByTagName('html');
    wrapperElement[0].setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
  };
  return (
    <>
      <Button text="change lang" onClick={changeLang} />
      {changeDirection(lang)}
    </>
  );
}

ChangeLanguage.propTypes = {
  changeLang: PropTypes.func.isRequired,
};

export default ChangeLanguage;
