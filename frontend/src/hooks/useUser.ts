import { useQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";
import { QUERY_KEYS } from "../constants";

const useUser = (userId: string | undefined) => {
  const fetchUser = async () => {
    try {
      const url = `/users/${userId}`;
      return await apiSecure.get(url);
    } catch (e) {
      console.log(e);
      // throw Error(e);
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: [`${QUERY_KEYS.user}/${userId}`],
    queryFn: fetchUser,
  });
  const responseData = data;
  return { data: responseData, error, isLoading };
};
export default useUser;
