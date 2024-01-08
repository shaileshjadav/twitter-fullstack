import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  alert?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  alert,
}) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  }, [onClick, href, navigate]);
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white"></Icon>
        {alert ? (
          <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" />
        ) : null}
      </div>
      {/* desktop */}
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-fill hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" />
        ) : null}
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};
export default SidebarItem;
