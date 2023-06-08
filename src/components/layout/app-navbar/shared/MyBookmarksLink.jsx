import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MyBookmarksLink() {
  const { t } = useTranslation('layout');
  return (
    <Nav.Link to="/bookmarks" as={Link} className="has-icon">
      <MdOutlineBookmarkBorder className="icon" />
      {t('navbar.myBookmarks')}
    </Nav.Link>
  );
}

export default MyBookmarksLink;
