import { BsHouseFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import type { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user: currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  interface SidebarConfigItem {
    label: string;
    href?: string;
    icon: IconType;
    alert?: boolean;
  }

  const items: SidebarConfigItem[] = [
    {
      label: "Home",
      href: "/home",
      icon: BsHouseFill,
    },
    // {
    //   label: "Notifications",
    //   href: "/notifications",
    //   icon: BsBellFill,
    //   // alert: currentUser?.hasNotification,
    //   alert: false,
    // },

    {
      label: "Profile",
      href: `/user/${currentUser?.id}`,
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-5 ">
      <div className="flex flex-col flex-end fixed">
        <div className="space-y-2 lg:w[230px]">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              label="Logout"
              icon={BiLogOut}
              onClick={() => {
                signOut();
                navigate("/");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
