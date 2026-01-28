import { useQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";

const userUsers = () => {
  const fetchUsers = async () => {
    try {
      const response = await apiSecure.get("/users");
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data, error, isLoading };
};

export default userUsers;
