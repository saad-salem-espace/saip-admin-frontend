import { useAuth } from 'react-oidc-context';

const AdminDashboard = () => {
  const auth = useAuth();
  return (
    <div>
      {auth ? (
        <div>
          <h1> Admin Dashboard </h1>
        </div>
      ) : null /* redirect to login */ }
    </div>
  );
};

export default AdminDashboard;
