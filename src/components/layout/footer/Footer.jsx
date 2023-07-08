import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from 'components/routes/routes.json';
import './footer.scss';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer py-3 bottom-0 w-100">
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col xl={4}>
            <p className="text-white fs-xs mb-0">
              <Trans
                i18nKey="footer.copyright"
                ns="layout"
              />
              {(new Date().getFullYear())}
            </p>
          </Col>
          <Col xl={8} className="d-flex justify-content-xl-end gap-5">
            <Link to={routes.terms} as={Link} className="fs-xs text-white text-decoration-none">
              {t('layout:footer.links.terms')}
            </Link>
            <Link to={routes.privacy} as={Link} className="fs-xs text-white text-decoration-none">
              {t('layout:footer.links.policy')}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
