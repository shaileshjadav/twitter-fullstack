import axios, { AxiosResponse } from "axios";
import {
  destroyRefreshToken,
  getCookie,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../utils/cookie";
import { COOKIE_NAMES } from "../constants";

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
  }
);

const apiSecure = () => {
  // axios instance for making requests
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // request interceptor for adding token
  axiosInstance.interceptors.request.use((config) => {
    const token: string | null = getCookie(COOKIE_NAMES.accessToken);
    // add token to request headers
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  const interceptor = axiosInstance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async function (error) {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response.
       *
       * Must be re-attached later on or the token refresh will only happen once
       */
      axios.interceptors.response.eject(interceptor);

      return api
        .post(import.meta.env.VITE_API_URL + "/auth/refreshToken", {
          refreshToken: getRefreshToken(),
        })
        .then((response: AxiosResponse<RefreshTokenResponse>) => {
          saveRefreshToken(response.data.refreshToken);
          saveAccessToken(response.data.token);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful

          return axios(error.response.config)
            .then((response: AxiosResponse<RefreshTokenResponse>) => {
              return response.data;
            })
            .catch((e) => {
              return Promise.reject(e);
            });
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          destroyRefreshToken();
          return Promise.reject(error2);
        });
    }
  );
  return axiosInstance;
};

export default apiSecure();
