import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MyQueriesLink() {
  const { t } = useTranslation('layout');
  return (
    <Nav.Link to="/savedQueries" as={Link} className="has-icon ps-lg-5">
      <BsStar className="icon" />
      {t('navbar.myQueries')}
    </Nav.Link>
  );
}

export default MyQueriesLink;
