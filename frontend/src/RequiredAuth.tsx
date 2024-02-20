import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { ClipLoader } from "react-spinners";

const RequiredAuth = () => {
  const { fetchCurrentUser } = useAuth();
  useEffect(() => {
        fetchCurrentUser();
  }, [fetchCurrentUser]);
  const { isAuthenticate, user } = useAuth();
  console.log(isAuthenticate);
  if (isAuthenticate === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-black ">
        <ClipLoader color="#36d7b7" size={80} />
      </div>
    );
  }
    return user ? <Outlet /> : <Navigate to="/" replace />;
};
export default RequiredAuth;
