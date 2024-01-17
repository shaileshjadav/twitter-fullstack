// import useCurrentUser from "@/hooks/useCurrentUser";
// import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useNavigate } from "react-router-dom";
import { forwardRef, useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "../../hooks/useLike";
// import useAuth from "../../hooks/useAuth";

interface PostItemProps {
  data: Record<string, any>;
}
const PostItem = forwardRef<HTMLDivElement, PostItemProps>(({ data }, ref) => {
  const navigate = useNavigate();
  // const loginModal = useLoginModal();
  // const { user: currentUser } = useAuth();

  const { toggleLike, isLoading } = useLike({
    postId: data.id,
  });

  // const goToUser = useCallback(
  //   (event: any) => {
  //     event.stopPropagation();
  //     router.push(`/users/${data.user.id}`);
  //   },
  //   [data.user.id, router]
  // );

  const goToPost = useCallback(() => {
    navigate(`/posts/${data.id}`);
  }, [data.id, navigate]);

  const hasLiked = useMemo(() => {
    return !!data.likes.length;
  }, [data.likes]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!isLoading) {
        toggleLike(hasLiked);
      }
    },
    [toggleLike, hasLiked, isLoading]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);
  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
      ref={ref}
    >
      <div className="flex flex-row items-start gap-3 ">
        <Avatar userId={data.userId} imageUrl={data.user.profileImage} />
        <div>
          <div className="flex flex-row items-center gap-2 ">
            <p
              className="text-white semibold cursor-pointer hover:underline"
              // onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span
              // onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-rows items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500 "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500 "
            >
              <LikeIcon size={20} color={data.likes.length ? "red" : ""} />
              <p>{data._count.likes || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostItem;
