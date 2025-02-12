import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const tokens = useSelector((state) => state.auth.tokens);
  const accessToken = tokens.access;

  if (!accessToken) {
    return <Navigate to="/skillsoop-frontend/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
