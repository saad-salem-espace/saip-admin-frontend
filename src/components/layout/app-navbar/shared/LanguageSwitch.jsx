import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function LanguageSwitch({ className }) {
  const { t } = useTranslation('layout');

  return (
    <div className={`${className} switch-language`}>
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

LanguageSwitch.propTypes = {
  className: PropTypes.string,
};

LanguageSwitch.defaultProps = {
  className: '',
};

export default LanguageSwitch;
