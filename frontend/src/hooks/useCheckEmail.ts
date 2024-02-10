import { useCallback } from "react";
import { api } from "../libs/axios";

const useCheckEmail = () => {
  const checkEmail = useCallback(
    async (email: string): Promise<{ isAlreadyExists: boolean }> => {
      const url = `/auth/checkEmail?email=${email}`;
      const result = await api.get(url);
      return result.data;
    },
    []
  );

  return { checkEmail };
};
export default useCheckEmail;
