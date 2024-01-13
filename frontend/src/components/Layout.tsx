import { Outlet } from "react-router-dom";
import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/Sidebar";

// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout = () => {
  return (
    <div className="h-screen bg-black overflow-auto">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-1 border-neutral-800 ">
            <div className="h-full overflow-y-auto p-4">
              <Outlet />
            </div>
          </div>
          {/* <FollowBar /> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
