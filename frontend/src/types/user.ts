export interface FetchedUser {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  coverImage: string | null;
  profileImage: string | null;
  createAt: Date;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
}
