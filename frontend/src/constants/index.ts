export const POSTS_PAGINATION_LIMIT = 5;

export const QUERY_KEYS = {
  posts: "posts",
  post: "post",
  user: "user",
};

export const COOKIE_NAMES= {
  accessToken: `${import.meta.env.VITE_ENV}_access_token`,
  refreshToken: `${import.meta.env.VITE_ENV}_refresh_token`,
}
