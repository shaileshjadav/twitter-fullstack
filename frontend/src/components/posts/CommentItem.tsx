import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";

interface CommentItemPros {
  data: Record<string, any>;
}
const CommentItem: React.FC<CommentItemPros> = ({ data }) => {
  const navigate = useNavigate();

  const goToUser = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      navigate(`/user/${data.user.id}`);
    },
    [data.user.id, navigate]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} imageUrl={data.user.profileImageUrl} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>

            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
