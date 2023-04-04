import { useAuth } from 'react-oidc-context';

const ExaminerDashboard = () => {
  const auth = useAuth();
  return (
    <div>
      {auth ? (
        <div>
          <h1> Dashboard </h1>
        </div>
      ) : null /* redirect to login */ }
    </div>
  );
};

export default ExaminerDashboard;
