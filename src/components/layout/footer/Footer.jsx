import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer py-3 position-fixed bottom-0 w-100">
      <Container fluid>
        <Row>
          <Col xl={4}>
            <p className="text-white fs-xs mb-0 mt-1">
              <Trans
                i18nKey="footer.copyright"
                ns="layout"
              />
              {(new Date().getFullYear())}
            </p>
          </Col>
          <Col xl={8} className="d-flex justify-content-xl-end gap-5 pt-1">
            <Link to="terms" as={Link} className="fs-xs text-white text-decoration-none">
              {t('layout:footer.links.terms')}
            </Link>
            <Link to="/privacy" as={Link} className="fs-xs text-white text-decoration-none">
              {t('layout:footer.links.policy')}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
