import Form from "../components/Form";
import Header from "../components/Header";
import PostFeed from "../components/posts/postFeed";

const Home: React.FC = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeHolder="what's happening?" />
      <PostFeed />
    </>
  );
};
export default Home;
