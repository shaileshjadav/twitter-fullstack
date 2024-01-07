import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}
const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={20}
            color="white"
            onClick={handleBack}
            className="
            cursor-pointer 
            hover:opacity-70
            transition
          "
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
