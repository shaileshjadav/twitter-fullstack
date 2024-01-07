import { create } from "zustand";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

// interface useAuthStore {
//   user: object | null;
//   setUser: (user: object) => void;
// }
// const useAuth = create<useAuthStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user: user }),
// }));

// export default useAuth;

interface AuthResponse {
  // TODO: Define the structure of the authentication response
  token: string;
}

interface useAuth {
  user: object | null;
  signIn: (username: string, password: string) => Promise<void>;
}

const useAuth = (): useAuth => {
  const [user, setUser] = useState<object | null>(null);

  const signIn = async (username: string, password: string): Promise<void> => {
    try {
      // Make a POST request to your authentication endpoint using Axios
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      // Assuming the authentication response contains a token or user information
      const authToken = response.data.token;

      // Update the user state or perform other authentication-related tasks
      setUser({ username, authToken });

      // Note: In a real-world scenario, you might store the token in a secure way (e.g., in a cookie or local storage).
    } catch (error) {
      // Handle authentication errors
      console.error("Authentication failed:", error);
      // You might want to set an error state or provide feedback to the user.
    }
  };

  return { user, signIn };
};

export default useAuth;
