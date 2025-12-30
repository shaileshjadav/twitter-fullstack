import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Header from "../components/Header";
import PostFeed from "../components/posts/postFeed";
import UserBio from "../components/users/UserBio";
import UserHero from "../components/users/UserHero";
import useUser from "../hooks/useUser";
import EditModal from "../components/modals/EditModal";
import useAuth from "../hooks/useAuth";

const User: React.FC = () => {
  const { userId } = useParams();
  const { data: userData, isLoading } = useUser(userId);
  const { user: currentUser } = useAuth();
  return (
    <>
      {isLoading && (
        <div className="container flex justify-center p-4">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      {userData && (
        <>
          <Header showBackArrow label={userData.name} />
          <UserHero
            userId={userId as string}
            coverImage={userData.coverImageUrl}
            image={userData.profileImageUrl}
          />
          <UserBio userId={userId as string} userData={userData} />
          <PostFeed userId={userId as string} />
          {currentUser?.id === userId && <EditModal />}
        </>
      )}
    </>
  );
};
export default User;
