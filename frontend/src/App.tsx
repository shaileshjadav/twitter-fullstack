import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";


function App(): JSX.Element {


  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
