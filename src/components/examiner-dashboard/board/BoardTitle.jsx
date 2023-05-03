import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Trans } from 'react-i18next';
import SortCards from './SortCards';

function BoardTitle({ setSort, activeWorkstream }) {
  return (
    <div className="border-bottom pb-3 mt-4">
      <div className="px-4">
        <Container fluid className="ps-18 mt-1">
          <Row>
            <Col md={4} lg={6}>
              <h4 className="text-primary-dark mt-2">
                <Trans i18nKey={activeWorkstream.BoardName}>
                  <b />
                </Trans>
              </h4>
            </Col>
            <Col md={8} lg={6}>
              <SortCards setSort={setSort} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
BoardTitle.propTypes = {
  setSort: PropTypes.func.isRequired,
  activeWorkstream: PropTypes.instanceOf(Object).isRequired,
};
export default BoardTitle;
