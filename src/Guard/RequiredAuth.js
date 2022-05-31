import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles = null, children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // if (auth?.roles?.find((role) => allowedRoles?.includes(role))) {
  // }
  // if (!auth?.user) {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
