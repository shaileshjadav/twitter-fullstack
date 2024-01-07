import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App(): JSX.Element {
  const { fetchCurrentUser, user } = useAuth();
  console.log(user);

  useEffect(() => {
    async function auth() {
      await fetchCurrentUser();
    }
    auth();
  }, [fetchCurrentUser]);

  // useEffect(() => {}, [fetchCurrentUser])
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
