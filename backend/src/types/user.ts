type optionalField = string | null;

export interface followsUserId {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: optionalField;
  username?: optionalField;
  bio?: optionalField;
  email?: optionalField;
  emailVerified: Date | null;
  image?: optionalField;
  coverImage?: optionalField;
  profileImage?: optionalField;
  profileImageUrl?: optionalField;
  followers?: followsUserId[];
  following?: followsUserId[];
  isFollowing?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export interface AuthUser {
  id: string;
  name: optionalField;
  email: optionalField;
  username: optionalField;
  token?: string;
  refreshToken?: string;
  profileImage?: optionalField;
  profileImageUrl?: optionalField;
}
