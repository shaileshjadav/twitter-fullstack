import { notificationsSvc } from "../libs/axios";
import { QUERY_KEYS } from "../constants";
import { useQuery } from "@tanstack/react-query";

const useNotifications = () => {
  const fetchNotifications = async () => {
    try {
      const url = `/notifications`;
      const result = await notificationsSvc.get(url);
      return result.data || [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [`${QUERY_KEYS.notifications}`],
    queryFn: fetchNotifications,
  });

  const responseData = data;
  return { data: responseData, error, isLoading };
};
export default useNotifications;
