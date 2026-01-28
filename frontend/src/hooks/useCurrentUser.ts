import useAuth from "./useAuth";

const useCurrentUser = () => {
  const { user, fetchCurrentUser } = useAuth();

  return {
    data: user,
    mutate: fetchCurrentUser,
  };
};

export default useCurrentUser;