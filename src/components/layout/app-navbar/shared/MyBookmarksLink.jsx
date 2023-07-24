import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import routes from 'components/routes/routes.json';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MyBookmarksLink() {
  const { t } = useTranslation('layout');
  return (
    <Nav.Link to={routes.bookmarks} as={Link} className="has-icon ms-lg-4">
      <MdOutlineBookmarkBorder className="icon" />
      {t('navbar.myBookmarks')}
    </Nav.Link>
  );
}

export default MyBookmarksLink;
