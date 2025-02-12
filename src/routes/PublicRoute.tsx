import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const tokens = useSelector((state) => state.auth.tokens);
  const accessToken = tokens.access;

  if (accessToken) {
    return <Navigate to="/skillsoop-frontend/candidate/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoute;
