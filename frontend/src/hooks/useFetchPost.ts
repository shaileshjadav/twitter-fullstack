import { useQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";
// import { Post } from "../types";
import { QUERY_KEYS } from "../constants";

const useFetchPost = (postId: string) => {
  const fetchPost = async () => {
    const url = `/posts/${postId}`;
    const result = await apiSecure.get(url);
    return result.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: [`${QUERY_KEYS.post}/${postId}`],
    queryFn: fetchPost,
  });

  const responseData = data;
  return { data: responseData, error, isLoading };
};
export default useFetchPost;
