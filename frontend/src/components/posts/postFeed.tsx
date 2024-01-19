import { ClipLoader } from "react-spinners";
import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";
import { Post } from "../../types";

interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], ref, isFetchingNextPage } = usePosts(userId);
  return (
    <>
      {posts.map((post: Post, index: number) => (
        <PostItem
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
