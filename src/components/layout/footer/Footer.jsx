import { Container, Row, Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer py-3 position-fixed bottom-0 w-100">
      <Container>
        <Row>
          <Col xl={12}>
            <p className="text-white fs-xs mb-0 text-center">
              <Trans
                i18nKey="footer.copyright"
                ns="layout"
              />
              {(new Date().getFullYear())}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
