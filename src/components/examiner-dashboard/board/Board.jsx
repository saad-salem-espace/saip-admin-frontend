import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';
import EmptyState from 'components/shared/empty-state/EmptyState';
import IprDetails from 'components/ipr-details/IprDetails';
import PropTypes from 'prop-types';
import StatusColumn from './StatusColumn';
import SortCards from './SortCards';
import EmptyBoardImage from '../../../assets/images/empty-board-data.png';
import PatentCard from './PatentCard';
import './board.scss';

function Board({
  setSort, assignments, setToggle, setActiveDocument, activeWorkstream, activeDocument,
}) {
  const { t } = useTranslation('dashboard');

  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const filterByStatus = (status) => (
    assignments.filter((assignment) => assignment.status === status)
  );

  const toDo = filterByStatus('TO_DO');
  const inProgress = filterByStatus('IN_PROGRESS');
  const review = filterByStatus('REVIEW');
  const done = filterByStatus('DONE');

  return (
    <>
      <div className="border-bottom pb-3 mt-4">
        <div className="px-4">
          <Container fluid className="ps-18 mt-1">
            <Row>
              <Col md={4} lg={6}>
                <h4 className="text-primary-dark mt-2">
                  <Trans
                    i18nKey={activeWorkstream.BoardName}
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
      <div className="position-relative">
        {
          activeDocument && (
            <IprDetails
              dashboard
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
              setActiveDocument={setActiveDocument}
              activeWorkstream={activeWorkstream.id}
              className={`${isIPRExpanded ? 'col-12 ps-65' : 'col-4 border-start'} dashboard-ipr-container position-absolute end-0 bg-white me-0`}
            />
          )
        }
        <div className="px-4 pt-4">
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
                    <PatentCard
                      assignment={assignment}
                      setToggle={setToggle}
                      setActiveDocument={setActiveDocument}
                    />
                  ))}
                </StatusColumn>
                <StatusColumn status={t('dashboard:status.inProgress')} className="border-secondary-rio-grande" count={inProgress.length}>
                  {inProgress.map((assignment) => (
                    <PatentCard
                      assignment={assignment}
                      setToggle={setToggle}
                      setActiveDocument={setActiveDocument}
                    />
                  ))}
                </StatusColumn>
                <StatusColumn status={t('dashboard:status.done')} className="border-primary-dark" count={review.length}>
                  {review.map((assignment) => (
                    <PatentCard
                      assignment={assignment}
                      setToggle={setToggle}
                      setActiveDocument={setActiveDocument}
                    />
                  ))}
                </StatusColumn>
                <StatusColumn status={t('dashboard:status.review')} className="border-danger-dark" count={done.length}>
                  {done.map((assignment) => (
                    <PatentCard
                      assignment={assignment}
                      setToggle={setToggle}
                      setActiveDocument={setActiveDocument}
                    />
                  ))}
                </StatusColumn>
              </Row>
            )}
          </Container>
        </div>
      </div>
    </>
  );
}

Board.propTypes = {
  setSort: PropTypes.func.isRequired,
  assignments: PropTypes.instanceOf(Array).isRequired,
  setToggle: PropTypes.func.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeWorkstream: PropTypes.instanceOf(Object).isRequired,
  activeDocument: PropTypes.string.isRequired,
};

export default Board;
