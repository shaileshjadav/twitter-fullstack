import { useParams } from "react-router-dom";

import Form from "../components/Form";
import Header from "../components/Header";
import PostItem from "../components/posts/PostItem";
import CommentFeed from "../components/posts/CommentFeed";
import useFetchPost from "../hooks/useFetchPost";
import { ClipLoader } from "react-spinners";

const Post: React.FC = () => {
  const { postId } = useParams();
  const { data: fetchedPost = [], isLoading } = useFetchPost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={80} color="#36d7b7" />
      </div>
    );
  }
  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeHolder="Post your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};
export default Post;
