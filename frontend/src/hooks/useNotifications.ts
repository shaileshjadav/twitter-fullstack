import { useQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";

const useNotifications = (userId?: string) => {
  const fetchNotifications = async () => {
    if (!userId) return [];

    try {
      const response = await apiSecure.get(`/notifications/${userId}`);
      return response.data ?? [];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: fetchNotifications,
    enabled: !!userId,
  });

  return { data, error, isLoading, mutate: refetch };
};

export default useNotifications;
