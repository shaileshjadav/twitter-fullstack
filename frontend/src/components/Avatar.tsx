import { useNavigate } from "react-router-dom";
import { useCallback, MouseEvent } from "react";
import imagePlaceHolder from "../assets/images/placeholder.png";
interface AvatarProps {
  userId: string;
  imageUrl?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  imageUrl = "",
  isLarge,
  hasBorder,
}) => {
  const navigate = useNavigate();
  const onClick = useCallback(
    (event: MouseEvent<HTMLImageElement>) => {
      event.stopPropagation;
      const url = `/user/${userId}`;
      navigate(url);
    },
    [navigate, userId]
  );
  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black rounded-full" : ""}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      rounded-fill
      hover:opacity-90
      transition
      cursor-pointer
      relative
`}
    >
      <img
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={imageUrl || imagePlaceHolder}
      />
    </div>
  );
};
export default Avatar;
