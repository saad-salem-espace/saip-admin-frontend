import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { Link } from 'react-router-dom';

function RecentSearch() {
  const { t } = useTranslation('layout');
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        className="appBtn app-bg-primary-01 has-icon btn nav-link mx-auto my-3 my-lg-0 rounded"
        size="lg"
        id="recent-search"
        disabled
      >
        <RxCounterClockwiseClock className="icon" />
        {t('navbar.recentSearch')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item to="#/action-1" as={Link}>Action</Dropdown.Item>
        <Dropdown.Item to="#/action-2" as={Link}>Another action</Dropdown.Item>
        <Dropdown.Item to="#/action-3" as={Link}>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RecentSearch;
