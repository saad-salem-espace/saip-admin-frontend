import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

function LanguageSwitch() {
  const { t } = useTranslation('layout');

  return (
    <div className="pe-lg-5 me-lg-5 switch-language">
      <Dropdown>
        <Dropdown.Toggle align="start" variant="primary-10" className="appBtn has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
          {t('navbar.english')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-2">
            {t('navbar.arabic')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default LanguageSwitch;
