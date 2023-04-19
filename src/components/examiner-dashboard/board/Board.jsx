/* eslint-disable react/forbid-prop-types */
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import EmptyState from 'components/shared/empty-state/EmptyState';
import PropTypes from 'prop-types';
import SortCards from './SortCards';
import StatusColumn from './StatusColumn';
import EmptyBoardImage from '../../../assets/images/empty-board-data.png';
import PatentCard from './PatentCard';
import './board.scss';

function Board({ setSort, assignments }) {
  // to show empty state change emptyBoard to TRUE
  const { t } = useTranslation('dashboard');
  console.log(assignments);
  const filterByStatus = (status) => (
    assignments.filter((assignment) => assignment.status === status)
  );

  const toDo = filterByStatus('TO_DO');
  const inProgress = filterByStatus('IN_PROGRESS');
  const review = filterByStatus('REVIEW');
  const done = filterByStatus('DONE');

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
                <SortCards setSort={setSort} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="px-4">
        <Container fluid className="board-container ps-18">
          {!(assignments.length) ? (
            <EmptyState
              title={t('dashboard:emptyBoardTitle')}
              msg={t('dashboard:emptyBoardMessage')}
              img={EmptyBoardImage}
              className="empty-board"
            />
          ) : (
            <Row>
              <StatusColumn status={t('dashboard:status.toDo')} className="border-primary" count={toDo.length}>
                {toDo.map((assignment) => (
                  <PatentCard assignment={assignment} />
                ))}
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.inProgress')} className="border-secondary-rio-grande" count={inProgress.length}>
                {inProgress.map((assignment) => (
                  <PatentCard assignment={assignment} />
                ))}
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.done')} className="border-primary-dark" count={review.length}>
                {review.map((assignment) => (
                  <PatentCard assignment={assignment} />
                ))}
              </StatusColumn>
              <StatusColumn status={t('dashboard:status.review')} className="border-danger-dark" count={done.length}>
                {done.map((assignment) => (
                  <PatentCard assignment={assignment} />
                ))}
              </StatusColumn>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

Board.propTypes = {
  setSort: PropTypes.func.isRequired,
  assignments: PropTypes.array.isRequired,
};

export default Board;
