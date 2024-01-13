export interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  likedIds: string[];
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
