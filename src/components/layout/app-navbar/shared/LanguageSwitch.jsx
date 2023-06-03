import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function LanguageSwitch({ className, lang, changeLang }) {
  const { t } = useTranslation('layout');
  return (
    <div className={`${className} switch-language ms-2 ms-lg-0`}>
      <Dropdown>
        <Dropdown.Toggle align="start" variant="link" className="rounded appBtn app-bg-primary-01 has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
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
  className: PropTypes.string,
  changeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

LanguageSwitch.defaultProps = {
  className: '',
};

export default LanguageSwitch;
