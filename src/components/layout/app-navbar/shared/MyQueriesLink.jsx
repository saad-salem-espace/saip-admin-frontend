import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import routes from 'components/routes/routes.json';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MyQueriesLink() {
  const { t } = useTranslation('layout');
  return (
    <Nav.Link to={routes.savedQueries} as={Link} className="has-icon">
      <BsStar className="icon" />
      {t('navbar.myQueries')}
    </Nav.Link>
  );
}

export default MyQueriesLink;
