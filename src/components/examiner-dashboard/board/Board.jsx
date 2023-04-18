/* eslint-disable */
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import EmptyState from 'components/shared/empty-state/EmptyState';
import SortCards from './SortCards';
import StatusColumn from './StatusColumn';
import EmptyBoardImage from '../../../assets/images/empty-board-data.png';
import PatentCard from './PatentCard';
import './board.scss';

function Board({activeWorkstream}) {
  // to show empty state change emptyBoard to TRUE
  const { t } = useTranslation('dashboard');
  console.log(activeWorkstream);
  const emptyBoard = false;
  return (
    <>
      <div className="border-bottom pb-3 mb-5">
        <div className="px-4">
          <Container fluid className="ps-18 mt-1">
            <Row>
              <Col md={4} lg={6}>
                <h4 className="text-primary-dark mt-2">
                  <Trans
                    i18nKey="dashboard:patentsBoard"
                  >
                    <b />
                  </Trans>
                </h4>
              </Col>
              <Col md={8} lg={6}>
                <SortCards />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="px-4">
        <Container fluid className="board-container ps-18">
          {emptyBoard ? (
            <EmptyState
              title={t('dashboard:emptyBoardTitle')}
              msg={t('dashboard:emptyBoardMessage')}
              img={EmptyBoardImage}
              className="empty-board"
            />
          ) : (
            <Row>
              <StatusColumn status={t('dashboard:status.toDo')} className="border-primary" count="5">
                <PatentCard />
                <PatentCard />
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.inProgress')} className="border-secondary-rio-grande" count="3">
                <PatentCard />
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.done')} className="border-primary-dark" count="2">
                <PatentCard />
                <PatentCard />
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.review')} className="border-danger-dark" count="1" />
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default Board;
