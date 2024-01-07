import { useQuery } from "react-query";
import apiSecure from "../libs/axios";

const usePosts = (userId?: string) => {
  const url = userId ? `/posts?userId=${userId}` : `/posts`;

  const fetchPost = async () => {
    apiSecure.get(url);
  };
  const { data, error, isLoading } = useQuery("postsData", fetchPost);

  return { data, error, isLoading };
};
export default usePosts;
