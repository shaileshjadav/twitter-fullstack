// import Form from "../components/Form";
import Header from "../components/Header";
import PostFeed from "../components/posts/postFeed";
import useAuth from "../hooks/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();
  console.log("USERHOME", user);
  return (
    <>
      <Header label="Home" />
      {/* <Form placeHolder="what's happening?" /> */}
      <PostFeed />
    </>
  );
};
export default Home;
