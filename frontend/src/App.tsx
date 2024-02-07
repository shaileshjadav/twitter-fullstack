import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App(): JSX.Element {
  const { fetchCurrentUser } = useAuth();
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
