import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useAxios from 'hooks/useAxios';
import getAssigned from 'apis/dashboard/getAssigned';
import getAssignedWorkstreams from 'apis/dashboard/getAssignedWorkstreams';
import Spinner from 'components/shared/spinner/Spinner';
import activeWorkstreamContext from 'components/ipr-details/shared/context/activeWorkstreamContext';
import EmptyState from 'components/shared/empty-state/EmptyState';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import Sidebar from './sidebar/Sidebar';
import Board from './board/Board';
import notAssigned from '../../assets/images/not-assigned.svg';

const ExaminerDashboard = ({ updateFocusArea, showFocusArea }) => {
  const { t } = useTranslation('dashboard');

  const { setWorkStreamId } = useContext(SelectedWorkStreamIdContext);
  const linksList = [
    {
      id: 1,
      workStreamName: t('dashboard:workStream.patent'),
      WorkStreamClass: 'ic-patent',
      BoardName: 'dashboard:board.patent',
    },
    {
      id: 2,
      workStreamName: t('dashboard:workStream.trademark'),
      WorkStreamClass: 'ic-trademark',
      BoardName: 'dashboard:board.trademark',
    },
    {
      id: 3,
      workStreamName: t('dashboard:workStream.industrialDesign'),
      WorkStreamClass: 'ic-industrial-design',
      BoardName: 'dashboard:board.industrialDesign',
    },
    {
      id: 4,
      workStreamName: t('dashboard:workStream.copyrights'),
      WorkStreamClass: 'ic-copyrights',
      BoardName: 'dashboard:board.copyrights',
    },
    {
      id: 5,
      workStreamName: t('dashboard:workStream.plantVarieties'),
      WorkStreamClass: 'ic-plant-varieties',
      BoardName: 'dashboard:board.plantVarieties',
    },
    {
      id: 6,
      workStreamName: t('dashboard:workStream.integratedCircuits'),
      WorkStreamClass: 'ic-integrated-circuits',
      BoardName: 'dashboard:board.integratedCircuits',
    },
  ];
  const selectedWorkStream = useContext(SelectedWorkStreamIdContext);
  const [activeWorkstream, setActiveWorkstream] = useState(selectedWorkStream);
  const [sort, setSort] = useState('Queue');
  const [{ data }, executeAssignmentData] = useAxios(getAssigned({
    workstreamId: activeWorkstream?.id,
    sortBy: sort,
  }), { manual: true });
  const [workstreamsData, executeWorkstreamData] = useAxios(
    getAssignedWorkstreams(),
    { manual: true },
  );

  const [assignments, setAssignments] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [assignedWorkstreams, setAssignedWorkstreams] = useState(null);
  const [notesUpdated, setNotesUpdated] = useState(false);
  const [workstreamChange, setWorkstreamChange] = useState(false);

  useEffect(() => {
    executeWorkstreamData();
  }, []);

  useEffect(() => {
    if (workstreamsData?.data) {
      setAssignedWorkstreams(workstreamsData.data.data);
      if (workstreamsData.data.data.length) {
        const firstWorkstream = linksList.find(
          (element) => element.id === workstreamsData.data.data[0],
        );
        const selectedWorkStreamObj = linksList.find(
          (element) => element.id === selectedWorkStream?.workStreamId,
        );
        setActiveWorkstream(selectedWorkStreamObj || firstWorkstream);
        setWorkstreamChange(true);
        setWorkStreamId(activeWorkstream?.id || selectedWorkStream?.workStreamId);
      }
    }
  }, [workstreamsData]);

  useEffect(() => {
    if (activeWorkstream) executeAssignmentData();
  }, [activeWorkstream, sort]);

  useEffect(() => {
    if (workstreamsData.data) {
      if (workstreamChange && (activeWorkstream?.id !== workstreamsData.data.data[0])) {
        updateFocusArea(false);
      }
    }
  }, [activeWorkstream, workstreamsData, workstreamChange]);

  useEffect(() => {
    if (toggle || notesUpdated) executeAssignmentData();
  }, [toggle, notesUpdated]);

  useEffect(() => {
    if (data) {
      setAssignments(data?.data);
      setToggle(false);
      setNotesUpdated(false);
    }
  }, [data]);

  if (!assignedWorkstreams || ((assignedWorkstreams.length > 0) && !assignments)) return (<div className="d-flex justify-content-center mt-18"><Spinner /></div>);

  const changeWorkstream = (i) => {
    setActiveWorkstream(i);
    setActiveDocument(null);
    setWorkStreamId(i.id);
  };

  const DashboardView = (
    <div>
      <Sidebar
        linksList={linksList}
        setActiveWorkstream={changeWorkstream}
        activeWorkstream={activeWorkstream}
        assignedWorkstreams={assignedWorkstreams}
      />
      <Board
        activeWorkstream={activeWorkstream}
        setSort={setSort}
        assignments={assignments}
        setToggle={setToggle}
        setActiveDocument={setActiveDocument}
        activeDocument={activeDocument}
        setNotesUpdated={setNotesUpdated}
        updateFocusArea={updateFocusArea}
        showFocusArea={showFocusArea}
      />
    </div>
  );

  return (
    assignedWorkstreams.length
      ? <activeWorkstreamContext.Provider value={activeWorkstream}>
        <div>
          {DashboardView}
        </div>
        {/* eslint-disable-next-line react/jsx-indent */}
        </activeWorkstreamContext.Provider>
      : <EmptyState
          title={t('notAssigned')}
          msg={t('emptyStateTitle')}
          img={notAssigned}
          className="no-assigment"
      />
  );
};

ExaminerDashboard.propTypes = {
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
};

export default ExaminerDashboard;
