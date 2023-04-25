import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import getAssigned from 'apis/dashboard/getAssigned';
import Spinner from 'components/shared/spinner/Spinner';
import IprDetails from 'components/ipr-details/IprDetails';
import Sidebar from './sidebar/Sidebar';
import Board from './board/Board';

function ExaminerDashboard() {
  const [activeWorkstream, setActiveWorkstream] = useState(1);
  const [sort, setSort] = useState('Queue');
  const [{ data }, execute] = useAxios(getAssigned({
    workstreamId: activeWorkstream,
    sortBy: sort,
    page: 0,
  }), { manual: true });
  const [assignments, setAssignments] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);

  const collapseIPR = () => {
    setIsIPRExpanded(!isIPRExpanded);
  };

  const handleCloseIprDetail = () => {
    setActiveDocument(null);
    setIsIPRExpanded(false);
  };

  useEffect(() => {
    execute();
  }, [activeWorkstream, sort, toggle]);

  useEffect(() => {
    if (data) {
      setAssignments(data?.data);
      setToggle(false);
    }
  }, [data]);

  return (
    assignments
      ? <div>
        <Sidebar setActiveWorkstream={setActiveWorkstream} />
        <Board
          activeWorkstream={activeWorkstream}
          setSort={setSort}
          assignments={assignments}
          setToggle={setToggle}
          setActiveDocument={setActiveDocument}
        />
        {
          activeDocument && (
            <IprDetails
              collapseIPR={collapseIPR}
              isIPRExpanded={isIPRExpanded}
              documentId={activeDocument}
              onClose={handleCloseIprDetail}
              setActiveDocument={setActiveDocument}
              activeWorkstream={activeWorkstream}
            />
          )

        }
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </div> : <div className="d-flex justify-content-center mt-18"><Spinner /></div>
  );
}

export default ExaminerDashboard;
