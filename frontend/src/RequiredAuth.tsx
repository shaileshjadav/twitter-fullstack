import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequiredAuth = () => {
  const { isAuthenticate, user } = useAuth();
  if (isAuthenticate === null) {
    return;
  }
  return user ? <Outlet /> : <Navigate to="/" replace />;
};
export default RequiredAuth;
