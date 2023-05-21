import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import getAssigned from 'apis/dashboard/getAssigned';
import Spinner from 'components/shared/spinner/Spinner';
import activeWorkstreamContext from 'components/ipr-details/shared/context/activeWorkstreamContext';
import Sidebar from './sidebar/Sidebar';
import Board from './board/Board';

function ExaminerDashboard() {
  const { t } = useTranslation('dashboard');
  // const linksList = [
  //   {
  //     id: 1,
  //     workStreamName: t('dashboard:workStream.patent'),
  //     WorkStreamClass: 'ic-patent',
  //     BoardName: 'dashboard:board.patent',
  //   },
  //   {
  //     id: 2,
  //     workStreamName: t('dashboard:workStream.trademark'),
  //     WorkStreamClass: 'ic-trademark',
  //     BoardName: 'dashboard:board.trademark',
  //   },
  //   {
  //     id: 3,
  //     workStreamName: t('dashboard:workStream.copyrights'),
  //     WorkStreamClass: 'ic-copyrights',
  //     BoardName: 'dashboard:board.copyrights',
  //   },
  //   {
  //     id: 4,
  //     workStreamName: t('dashboard:workStream.industrialDesign'),
  //     WorkStreamClass: 'ic-industrial-design',
  //     BoardName: 'dashboard:board.industrialDesign',
  //   },
  //   {
  //     id: 5,
  //     workStreamName: t('dashboard:workStream.plantVarieties'),
  //     WorkStreamClass: 'ic-plant-varieties',
  //     BoardName: 'dashboard:board.plantVarieties',
  //   },
  //   {
  //     id: 6,
  //     workStreamName: t('dashboard:workStream.integratedCircuits'),
  //     WorkStreamClass: 'ic-integrated-circuits',
  //     BoardName: 'dashboard:board.integratedCircuits',
  //   },
  // ];
  const linksList = [
    {
      id: 1,
      workStreamName: t('dashboard:workStream.patent'),
      WorkStreamClass: 'ic-patent',
      BoardName: 'dashboard:board.patent',
    },
  ];
  const [activeWorkstream, setActiveWorkstream] = useState(linksList[0]);
  const [sort, setSort] = useState('Queue');
  const [{ data }, execute] = useAxios(getAssigned({
    workstreamId: activeWorkstream.id,
    sortBy: sort,
  }), { manual: true });
  const [assignments, setAssignments] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [activeDocument, setActiveDocument] = useState(null);
  const [notesUpdated, setNotesUpdated] = useState(false);

  useEffect(() => {
    execute();
  }, [activeWorkstream, sort]);

  useEffect(() => {
    if (toggle || notesUpdated) execute();
  }, [toggle, notesUpdated]);

  useEffect(() => {
    if (data) {
      setAssignments(data?.data);
      setToggle(false);
      setNotesUpdated(false);
    }
  }, [data]);

  return (
    assignments
      ? <activeWorkstreamContext.Provider value={activeWorkstream}>
        <div>
          <Sidebar
            linksList={linksList}
            setActiveWorkstream={setActiveWorkstream}
            activeWorkstream={activeWorkstream}
          />
          <Board
            activeWorkstream={activeWorkstream}
            setSort={setSort}
            assignments={assignments}
            setToggle={setToggle}
            setActiveDocument={setActiveDocument}
            activeDocument={activeDocument}
            setNotesUpdated={setNotesUpdated}
          />
        </div>
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </activeWorkstreamContext.Provider> : <div className="d-flex justify-content-center mt-18"><Spinner /></div>
  );
}

export default ExaminerDashboard;
