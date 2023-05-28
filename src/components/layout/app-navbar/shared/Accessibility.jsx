import { useEffect, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { IoSettingsOutline } from 'react-icons/io5';
import { CgEditContrast } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';

const Accessibility = () => {
  const { t } = useTranslation('layout');
  // dark mode controller
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode === true) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('selectedTheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('selectedTheme', 'light');
    }
  }, [darkMode]);
  //

  // font size controller
  const [size, setSize] = useState(16);
  useEffect(
    () => {
      document.documentElement.style.setProperty('--bs-body-font-size', `${size}px`);
    },
    [size],
  );
  return (
    <div className="accessibility-container">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          className="appBtn has-icon no-arrow ms-lg-4 btn nav-link mx-auto my-3 my-lg-0 rounded"
          size="lg"
          id="accessibility"
        >
          <IoSettingsOutline className="fs-22" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="py-1 px-3 pb-0">
            <div className="d-flex gap-2">
              <Button key="size-1" onClick={() => setSize(size + 2)} variant="outline-primary" className="appBtn size-control decrease" />
              <Button key="size-2" onClick={() => setSize(16)} variant="outline-primary" className="appBtn size-control reset" />
              <Button key="size-3" onClick={() => setSize(size - 2)} variant="outline-primary" className="appBtn size-control increase" />
            </div>
            <Button
              id="ItemItem"
              onClick={() => (darkMode === false ? setDarkMode(true) : setDarkMode(false))}
              className="d-flex align-items-center fs-sm text-primary-dark font-regular px-0 text-decoration-none mt-1"
              variant="link"
            >
              <CgEditContrast className="fs-22 text-primary me-2" />
              {t('Hight Contrast')}
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default Accessibility;
