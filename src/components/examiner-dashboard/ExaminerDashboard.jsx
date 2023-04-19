import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import getAssigned from 'apis/dashboard/getAssigned';
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
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    execute();
  }, [activeWorkstream, sort]);

  useEffect(() => {
    if (data) setAssignments(data?.data);
  }, [data]);

  return (
    <div>
      <Sidebar setActiveWorkstream={setActiveWorkstream} />
      <Board activeWorkstream={activeWorkstream} setSort={setSort} assignments={assignments} />
    </div>
  );
}

export default ExaminerDashboard;
