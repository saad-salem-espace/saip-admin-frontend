import routes from 'components/routes/routes.json';
import { useTranslation } from 'react-i18next';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { CiFloppyDisk } from 'react-icons/ci';
import { BsStar } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function CommonLinks() {
  const { t } = useTranslation('layout');
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle align="start" variant="link" className="rounded app-text-primary-dark appBtn has-icon btn nav-link mx-auto" size="lg" id="dropdown-basic">
          <CiFloppyDisk className="icon" />
          {t('navbar.myArchives')}
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-start py-0">
          <Dropdown.Item to={routes.bookmarks} as={Link}>
            <MdOutlineBookmarkBorder className="icon" />
            {t('navbar.myBookmarks')}
          </Dropdown.Item>
          <Dropdown.Item to={routes.savedQueries} as={Link}>
            <BsStar className="icon" />
            {t('navbar.myQueries')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CommonLinks;
