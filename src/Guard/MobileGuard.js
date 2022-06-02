import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const MobileGuard = ({ allowedPermission = [], allowedRoles = [], children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.role?.find((role) => allowedRoles?.includes(role))) {
    console.log('x');
  }
  // if (!auth?.user) {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }
  if (!auth.accessToken) {
    return <Navigate to="/mobile/welcome" state={{ from: location }} replace />;
  }
  return children;
};

export default MobileGuard;
