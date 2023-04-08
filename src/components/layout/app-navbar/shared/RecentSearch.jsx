import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import PropTypes from 'prop-types';

function RecentSearch({
  children,
}) {
  const { t } = useTranslation('layout');
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="primary-10"
        className="appBtn has-icon btn nav-link mx-auto my-3 my-lg-0"
        size="lg"
        id="recent-search"
      >
        <RxCounterClockwiseClock className="icon" />
        {t('navbar.recentSearch')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}

RecentSearch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecentSearch;
