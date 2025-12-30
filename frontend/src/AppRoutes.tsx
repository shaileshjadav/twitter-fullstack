import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import RequiredAuth from "./RequiredAuth";
import Layout from "./components/Layout";
import Post from "./pages/Post";
import User from "./pages/User";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route element={<RequiredAuth />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/user/:userId" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
