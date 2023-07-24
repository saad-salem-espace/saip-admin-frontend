import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { IoSettingsOutline } from 'react-icons/io5';
import { CgEditContrast } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';

const Accessibility = ({ className }) => {
  const { t } = useTranslation('layout');
  // dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  // control font size
  const [fontSize, setFontSize] = useState(() => {
    const savedSize = localStorage.getItem('fontSize');
    return savedSize ? parseInt(savedSize, 10) : 16;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize((prevSize) => prevSize - 1);
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 19) {
      setFontSize((prevSize) => prevSize + 1);
    }
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={`${className} accessibility-container`}>
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          className="appBtn with-hover no-arrow mx-auto rounded"
          id="accessibility"
        >
          <IoSettingsOutline className="fs-22 app-text-primary-dark" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div>
            <div className="py-1 px-3 pb-0">
              <div className="d-flex gap-2" dir="ltr">
                <Button key="size-1" onClick={decreaseFontSize} variant="outline-primary" className="appBtn size-control decrease" />
                <Button key="size-2" onClick={resetFontSize} variant="outline-primary" className="appBtn size-control reset" />
                <Button key="size-3" onClick={increaseFontSize} variant="outline-primary" className="appBtn size-control increase" />
              </div>
            </div>
            <Button
              id="ItemItem"
              onClick={toggleDarkMode}
              className={`${isDarkMode ? 'hight-contrast-activated' : ''} d-flex align-items-center fs-sm app-text-primary-dark font-regular px-0 text-decoration-none mt-2 d-block ps-3 w-100 rounded-0`}
              variant="link"
            >
              <CgEditContrast className="fs-22 app-text-primary me-2" />
              {t('navbar.hightContrast')}
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

Accessibility.propTypes = {
  className: PropTypes.string,
};

Accessibility.defaultProps = {
  className: '',
};

export default Accessibility;
