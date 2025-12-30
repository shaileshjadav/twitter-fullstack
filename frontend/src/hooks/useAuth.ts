import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import apiSecure, { api } from "../libs/axios";
import {
  destroyAccessToken,
  destroyRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../utils/cookie";

type user = {
  profileImageUrl: string | undefined;
  id: string;
};

interface SignUpData {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface useAuthStore {
  isAuthenticate: boolean | null;
  user: user | null;
  signIn: (username: string, password: string) => Promise<void>;
  signup: (signupData: SignUpData) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  signOut: () => void;
}
interface AuthResponse {
  email: string;
  id: string;
  name: string;
  token: string;
  username: string;
  profileImage: string;
  profileImageUrl?: string;
  refreshToken: string;
}

const useAuth = create<useAuthStore>((set) => ({
  isAuthenticate: null,
  user: null,
  signup: async (signUpData: SignUpData): Promise<void> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        `/auth/register`,
        signUpData
      );

      const userData = response.data;
      set({ user: { id: userData.id, profileImageUrl: "" } });
      saveRefreshToken(userData.refreshToken);
      saveAccessToken(userData.token);
    } catch (error: unknown) {
      // Handle authentication errors
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.message;
        throw new Error(err);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred.");
      }
    }
  },
  signIn: async (username: string, password: string): Promise<void> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        `/auth/login`,
        {
          username,
          password,
        }
      );

      const userData = response.data;
      set({ user: { id: userData.id, profileImageUrl: "" } });
      saveRefreshToken(userData.refreshToken);
      saveAccessToken(userData.token);
    } catch (error: unknown) {
      // Handle authentication errors
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.message;
        throw new Error(err);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred.");
      }
    }
  },
  fetchCurrentUser: async (): Promise<void> => {
    try {
      const response: AxiosResponse<AuthResponse> = await apiSecure.get(
        `/auth/currentuser`
      );

      // set({ user: { id: userData.id } });
      if (response) {
        const userData = response.data;
        set(() => ({
          isAuthenticate: true,
          user: { id: userData.id, profileImageUrl: userData?.profileImageUrl },
        }));
      }
    } catch (error: unknown) {
      // Handle authentication errors
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.message;
        throw new Error(err);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred.");
      }
    } finally {
      set(() => ({
        isAuthenticate: false,
      }));
    }
  },
  signOut: (): void => {
    destroyRefreshToken();
    destroyAccessToken();
  },
}));

export default useAuth;

// interface useAuth {
//   user: object | null;
//   signIn: (username: string, password: string) => Promise<void>;
// }

// // const useAuth = (): useAuth => {
// //   const [user, setUser] = useState<object | null>(null);

// //   const signIn = async (username: string, password: string): Promise<void> => {
// //     try {
// //       // Make a POST request to your authentication endpoint using Axios
// //       const response: AxiosResponse<AuthResponse> = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/auth/login`,
// //         {
// //           username,
// //           password,
// //         }
// //       );

// //       // Assuming the authentication response contains a token or user information
// //       const authToken = response.data.token;

// //       // Update the user state or perform other authentication-related tasks
// //       setUser({ username, authToken });

// //       // Note: In a real-world scenario, you might store the token in a secure way (e.g., in a cookie or local storage).
// //     } catch (error) {
// //       // Handle authentication errors
// //       console.error("Authentication failed:", error);
// //       // You might want to set an error state or provide feedback to the user.
// //     }
// //   };

// //   return { user, signIn };
// // };

// // export default useAuth;
