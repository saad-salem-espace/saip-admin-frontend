import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Board from './board/Board';

function ExaminerDashboard() {
  const [activeWorkstream, setActiveWorkstream] = useState(1);
  return (
    <div>
      <Sidebar setActiveWorkstream={setActiveWorkstream} />
      <Board activeWorkstream={activeWorkstream} />
    </div>
  );
}

export default ExaminerDashboard;
