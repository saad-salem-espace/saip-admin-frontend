import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function LanguageSwitch({ lang, changeLang }) {
  const { t } = useTranslation('layout');
  return (
    <div className="pe-lg-5 me-lg-5 switch-language">

      <Dropdown>
        <Dropdown.Toggle align="start" variant="primary-10" className="appBtn has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
          {lang === 'ar' ? t('navbar.arabic') : t('navbar.english')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={changeLang}>
            {lang === 'ar' ? t('navbar.english') : t('navbar.arabic')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
LanguageSwitch.propTypes = {
  changeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};
export default LanguageSwitch;
