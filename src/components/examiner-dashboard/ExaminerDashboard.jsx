import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import getAssigned from 'apis/dashboard/getAssigned';
import getAssignedWorkstreams from 'apis/dashboard/getAssignedWorkstreams';
import Spinner from 'components/shared/spinner/Spinner';
import Sidebar from './sidebar/Sidebar';
import Board from './board/Board';

function ExaminerDashboard() {
  const { t } = useTranslation('dashboard');
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

  const [activeWorkstream, setActiveWorkstream] = useState(linksList[0]);
  const [sort, setSort] = useState('Queue');
  const [{ data }, executeAssignmentData] = useAxios(getAssigned({
    workstreamId: activeWorkstream.id,
    sortBy: sort,
  }), { manual: true });
  const [workstreamsData, executeWorkstreamData] = useAxios(
    getAssignedWorkstreams(),
    { manual: true },
  );

  const [assignments, setAssignments] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [activeDocument, setActiveDocument] = useState(null);
  const [assignedWorkstreams, setAssignedWorkstreams] = useState([]);
  const [notesUpdated, setNotesUpdated] = useState(false);

  useEffect(() => {
    executeWorkstreamData();
  }, []);

  useEffect(() => {
    if (workstreamsData?.data) {
      setAssignedWorkstreams(workstreamsData.data.data);
    }
  }, [workstreamsData]);

  useEffect(() => {
    executeAssignmentData();
  }, [activeWorkstream, sort]);

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

  if (!assignments) return (<div className="d-flex justify-content-center mt-18"><Spinner /></div>);

  const changeWorkstream = (i) => {
    setActiveWorkstream(i);
    setActiveDocument(null);
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
      />
    </div>
  );

  return (
    assignedWorkstreams.length
      ? <div>
        {DashboardView}
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </div> : <div />
  );
}

export default ExaminerDashboard;
