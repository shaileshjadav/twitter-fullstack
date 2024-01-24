import { useParams } from "react-router-dom";

import Header from "../components/Header";
import PostFeed from "../components/posts/postFeed";
// import UserBio from "../components/users/UserBio";
import UserHero from "../components/users/UserHero";
import useUser from "../hooks/useUser";

const User: React.FC = () => {
  const { userId } = useParams();
  const { data: userData, isLoading } = useUser(userId);
  console.log("userData", userData);
  return (
    <>
      <Header showBackArrow label="test" />
      {/* <UserHero userId={userId as string} /> */}
      {/* <PostFeed userId={userId as string} /> */}
    </>
  );
};
export default User;
