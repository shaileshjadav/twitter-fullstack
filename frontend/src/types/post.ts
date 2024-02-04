interface comment {
  id: string;
}

export interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  hasLiked: boolean;
  comments: comment[];
  user: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
    profileImageUrl?: string;
  };
  _count: {
    likes: number;
  };
}

export interface SuccessResponse {
  message: string;
  error: false;
  code: number;
  data: Post[];
}

interface ApiError {
  message: string;
  error: boolean;
  code: number;
}

export type FetchPosts = (page: number) => Promise<SuccessResponse | ApiError>;
