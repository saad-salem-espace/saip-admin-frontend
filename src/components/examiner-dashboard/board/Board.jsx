import {
  Container,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import EmptyState from 'components/shared/empty-state/EmptyState';
import IprDetails from 'components/ipr-details/IprDetails';
import PropTypes from 'prop-types';
import StatusColumn from './StatusColumn';
import EmptyBoardImage from '../../../assets/images/empty-board-data.png';
import IprExpand from './IprExpand';
import BoardTitle from './BoardTitle';
import './board.scss';

function Board({
  setSort, assignments, setToggle, setActiveDocument, activeWorkstream, activeDocument,
}) {
  const { t } = useTranslation('dashboard');

  const filteredAssignments = {
    TO_DO: [],
    REVIEW: [],
    DONE: [],
    IN_PROGRESS: [],
  };
  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };
  let activeAssignment = false;
  for (let i = 0; i < assignments.length; i += 1) {
    filteredAssignments[assignments[i].status].push(assignments[i]);
    if (assignments[i].filingNumber === activeDocument) {
      activeAssignment = assignments[i];
    }
  }
  return (
    <div className="position-relative">
      <BoardTitle setSort={setSort} activeWorkstream={activeWorkstream} />
      {
        (activeDocument && isIPRExpanded) && (
          <IprExpand
            assignment={activeAssignment}
            collapseIPR={collapseIPR}
            documentId={activeDocument}
            isIPRExpanded={isIPRExpanded}
            onClose={handleCloseIprDetail}
            activeWorkstream={activeWorkstream.id}
            className={`${isIPRExpanded ? 'col-lg-12 ps-18' : 'col-lg-4 col-12 ps-18 ps-lg-0 border-start'}`}
          />
        )
      }
      <div className="position-relative">
        {
          (activeDocument && !isIPRExpanded) && (
            <IprDetails
              dashboard
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
              setActiveDocument={setActiveDocument}
              activeWorkstream={activeWorkstream.id}
              className={`${isIPRExpanded ? 'col-lg-12 ps-18' : 'col-lg-4 col-12 ps-18 ps-lg-0 border-start'} dashboard-ipr-container position-absolute top-0 end-0 bottom-0 h-100 bg-white me-0`}
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
                <StatusColumn
                  status={t('dashboard:status.toDo')}
                  className="border-primary"
                  data={filteredAssignments.TO_DO}
                  setToggle={setToggle}
                  setActiveDocument={setActiveDocument}
                  activeDocument={activeDocument}
                />
                <StatusColumn
                  status={t('dashboard:status.inProgress')}
                  className="border-secondary-rio-grande"
                  data={filteredAssignments.IN_PROGRESS}
                  setToggle={setToggle}
                  setActiveDocument={setActiveDocument}
                  activeDocument={activeDocument}
                />
                <StatusColumn
                  status={t('dashboard:status.done')}
                  className="border-primary-dark"
                  data={filteredAssignments.DONE}
                  setToggle={setToggle}
                  setActiveDocument={setActiveDocument}
                  activeDocument={activeDocument}
                />
                <StatusColumn
                  status={t('dashboard:status.review')}
                  className="border-danger-dark"
                  data={filteredAssignments.REVIEW}
                  setToggle={setToggle}
                  setActiveDocument={setActiveDocument}
                  activeDocument={activeDocument}
                />
              </Row>
            )}
          </Container>
        </div>
      </div>
    </div>
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
