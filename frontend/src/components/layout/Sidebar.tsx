import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiBadge, BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { signOut } from "next-auth/react";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidbarbarTweetButton from "./SidbarbarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },

    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-5">
      <div className="flex flex-col flex-end">
        <div className="space-y-2 lg:w[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              label="Logout"
              icon={BiLogOut}
              onClick={() => {
                signOut();
              }}
            />
          )}

          <SidbarbarTweetButton />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
