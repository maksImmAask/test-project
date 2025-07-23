import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';


const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } 
  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
