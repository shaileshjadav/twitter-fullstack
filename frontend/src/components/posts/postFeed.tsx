import { ClipLoader } from "react-spinners";
import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], ref, isFetchingNextPage } = usePosts(userId);
  return (
    <>
      {posts.map((post: Record<string, any>, index: number) => (
        <PostItem
          userId={userId}
          key={post.id}
          data={post}
          ref={posts.length === index + 1 ? ref : null}
        />
      ))}
      {isFetchingNextPage && (
        <div className="container flex justify-center p-4">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
};

export default PostFeed;
