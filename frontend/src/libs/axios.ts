import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiSecure = () => {
  const token: string | null = localStorage.getItem("authToken");
  // axios instance for making requests
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // request interceptor for adding token
  axiosInstance.interceptors.request.use((config) => {
    // add token to request headers
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  const saveToken = (token: string) => {
    localStorage.setItem("REFRESH-TOKEN", token);
  };
  const destroyToken = () => {
    localStorage.removeItem("REFRESH-TOKEN");
  };
  const _getToken = () => localStorage.getItem("REFRESH-TOKEN");
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

      return axios
        .post(import.meta.env.VITE_API_URL + "/auth/refreshToken", {
          refreshToken: _getToken(),
        })
        .then((response) => {
          saveToken(response.data.data.refreshToken);
          localStorage.setItem("authToken", response.data.data.token);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.data.token;
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return axios(error.response.config);
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          destroyToken();
          console.log("LOGIN REDIRECT");
          // this.router.push("/login");
          return Promise.reject(error2);
        });
    }
  );
  return axiosInstance;
};

export default apiSecure();
