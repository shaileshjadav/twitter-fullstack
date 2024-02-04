import Avatar from "../Avatar";
interface UserHeroProps {
  userId: string;
  coverImage: string;
  image: string;
}
const UserHero: React.FC<UserHeroProps> = ({ coverImage, image, userId }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {coverImage && (
          <img
            src={coverImage}
            className="h-full w-full  object-cover object-center"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder imageUrl={image} />
        </div>
      </div>
    </div>
  );
};
export default UserHero;
