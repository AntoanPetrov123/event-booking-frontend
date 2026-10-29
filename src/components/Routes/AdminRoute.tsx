import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, authChecked, user } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(
    {
      isAuthenticated,
      isAdmin,
      user,
      authChecked,
    },
    "in page"
  );

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
