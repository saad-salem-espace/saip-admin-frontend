import {
  Container,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import EmptyState from 'components/shared/empty-state/EmptyState';
import IprDetails from 'components/ipr-details/IprDetails';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useAxios from 'hooks/useAxios';
import getAssignedDocumentsTransitions from 'apis/dashboard/getAssignedDocumentsTransitions';
import { search } from 'utils/arrays';
import updateAssignedDocumentState from 'apis/dashboard/updateAssignedDocumentState';
import toastify from 'utils/toastify';
import StatusColumn from './StatusColumn';
import EmptyBoardImage from '../../../assets/images/empty-board-data.png';
import IprExpand from './IprExpand';
import BoardTitle from './BoardTitle';
import './board.scss';
import Spinner from '../../shared/spinner/Spinner';

const INITIAL_BOARD_STATE = {
  TO_DO: [],
  REVIEW: [],
  DONE: [],
  IN_PROGRESS: [],
};

const Board = ({
  setSort, assignments, setToggle, setActiveDocument, activeWorkstream, activeDocument,
  setNotesUpdated, updateFocusArea, showFocusArea,
}) => {
  const { t } = useTranslation('dashboard');
  const [transitions] = useAxios(getAssignedDocumentsTransitions());
  const [, executeUpdateState] = useAxios(updateAssignedDocumentState({}), { manual: true, onError: 'custom' });

  const [filteredAssignments, setFilteredAssignments] = useState(INITIAL_BOARD_STATE);

  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const [activeTab, setActiveTab] = useState();
  const [isCardInprogress, setIsCardInprogress] = useState();
  const [selectedCardId, setSelectedCardId] = useState();
  const [activeAssignment, setActiveAssignment] = useState(false);

  useEffect(() => {
    if (assignments.length) {
      const newFilteredAssignments = JSON.parse(JSON.stringify(INITIAL_BOARD_STATE));

      assignments.forEach((assignment) => {
        newFilteredAssignments[assignment.status].push(assignment);
      });
      setFilteredAssignments(newFilteredAssignments);
    }
  }, [assignments]);

  useEffect(() => {
    if (activeDocument) {
      setActiveAssignment(search(assignments, 'filingNumber', activeDocument));
    } else {
      setActiveAssignment(false);
    }
  }, [activeDocument]);

  const canDropItem = (fromState, toState) => (
    transitions.data && transitions.data.data[fromState].includes(toState)
  );

  const onColumnChange = useCallback((targetDocument, fromState, toState) => {
    if (canDropItem(fromState, toState)) {
      executeUpdateState(updateAssignedDocumentState({
        documentId: targetDocument.id,
        assignmentStatus: toState,
      })).then((response) => {
        setFilteredAssignments((prevState) => {
          const newFilteredAssignments = JSON.parse(JSON.stringify(prevState));
          const newDocument = JSON.parse(JSON.stringify(targetDocument));
          newFilteredAssignments[fromState] = newFilteredAssignments[fromState].filter(
            (filteredDoc) => filteredDoc.id !== targetDocument.id,
          );
          Object.assign(newDocument, response.data.data);
          newFilteredAssignments[toState].push(newDocument);
          return newFilteredAssignments;
        });
      }).catch(() => {
        toastify('error', t('dashboard:board.errors.updateStatus'));
      });
    }
  }, [filteredAssignments, transitions]);

  if (!transitions.data) return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;

  const SetSelectedCard = (id) => {
    setSelectedCardId(id);
  };

  const changeActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  const isInProgress = (cardStatus) => {
    setIsCardInprogress(cardStatus);
  };

  // eslint-disable-next-line xss/no-mixed-html
  return (
    <DndProvider backend={HTML5Backend}>
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
            activeTab={activeTab}
            activeWorkstream={activeWorkstream.id}
            isCardInprogress={isCardInprogress}
            selectedCardId={selectedCardId}
            setNotesUpdated={setNotesUpdated}
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
              activeTab={activeTab}
              activeWorkstream={activeWorkstream.id}
              isCardInprogress={isCardInprogress}
              selectedCardId={selectedCardId}
              setNotesUpdated={setNotesUpdated}
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
                    className="todo"
                    data={filteredAssignments.TO_DO}
                    setToggle={setToggle}
                    setActiveDocument={setActiveDocument}
                    onColumnChange={onColumnChange}
                    isInProgress={isInProgress}
                    activeDocument={activeDocument}
                    updateFocusArea={updateFocusArea}
                    SetSelectedCard={SetSelectedCard}
                    showFocusArea={showFocusArea}
                    activeWorkstream={activeWorkstream.id}
                    columnName="TO_DO"
                    canDropItem={canDropItem}
                  />
                  <StatusColumn
                    status={t('dashboard:status.inProgress')}
                    className="in-progress"
                    data={filteredAssignments.IN_PROGRESS}
                    setToggle={setToggle}
                    setActiveDocument={setActiveDocument}
                    activeDocument={activeDocument}
                    onColumnChange={onColumnChange}
                    setActiveTab={changeActiveTab}
                    isInProgress={isInProgress}
                    SetSelectedCard={SetSelectedCard}
                    updateFocusArea={updateFocusArea}
                    showFocusArea={showFocusArea}
                    activeWorkstream={activeWorkstream.id}
                    columnName="IN_PROGRESS"
                    canDropItem={canDropItem}
                  />
                  <StatusColumn
                    status={t('dashboard:status.done')}
                    className="done"
                    data={filteredAssignments.DONE}
                    setToggle={setToggle}
                    isInProgress={isInProgress}
                    onColumnChange={onColumnChange}
                    setActiveDocument={setActiveDocument}
                    activeDocument={activeDocument}
                    updateFocusArea={updateFocusArea}
                    SetSelectedCard={SetSelectedCard}
                    showFocusArea={showFocusArea}
                    activeWorkstream={activeWorkstream.id}
                    columnName="DONE"
                    canDropItem={canDropItem}
                  />
                  <StatusColumn
                    status={t('dashboard:status.review')}
                    className="review"
                    data={filteredAssignments.REVIEW}
                    setToggle={setToggle}
                    setActiveDocument={setActiveDocument}
                    isInProgress={isInProgress}
                    onColumnChange={onColumnChange}
                    activeDocument={activeDocument}
                    updateFocusArea={updateFocusArea}
                    SetSelectedCard={SetSelectedCard}
                    showFocusArea={showFocusArea}
                    activeWorkstream={activeWorkstream.id}
                    columnName="REVIEW"
                    canDropItem={canDropItem}
                  />
                </Row>
              )}
            </Container>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

Board.propTypes = {
  setSort: PropTypes.func.isRequired,
  assignments: PropTypes.instanceOf(Array).isRequired,
  setToggle: PropTypes.func.isRequired,
  setActiveDocument: PropTypes.func.isRequired,
  activeWorkstream: PropTypes.instanceOf(Object).isRequired,
  activeDocument: PropTypes.string.isRequired,
  setNotesUpdated: PropTypes.func.isRequired,
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
};

export default Board;
