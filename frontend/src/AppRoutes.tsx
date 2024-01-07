import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import RequiredAuth from "./RequiredAuth";

// function ProtectedRoute(): JSX.Element {
//   const { user } = useAuth();
//   console.log("USER");
//   console.log(user);

//   return user ? <Outlet /> : <Navigate to="/" replace />;
// }

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route element={<RequiredAuth />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
