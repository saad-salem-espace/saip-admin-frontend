import { Trans } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WorkStreams from '../work-streams/WorkStreams';
import style from './style.module.scss';

function PatentsSearch() {
  return (
    <div className={`${style.header}`}>
      <Container className="px-0 m-auto">
        <Row className="mx-0">
          <Col className="pt-18  pb-8">
            <p className="text-primary-dark f-30 text-center mb-8">
              <Trans
                i18nKey="searchSpecificProperty"
                ns="search"
                components={<span className="h3" />}
              />
            </p>
            <WorkStreams />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatentsSearch;
