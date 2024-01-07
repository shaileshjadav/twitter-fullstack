import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const userUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);
  return { data, error, isLoading, mutate };
};
export default userUsers;
