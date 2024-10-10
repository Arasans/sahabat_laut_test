import axios from "axios";

const api = axios.create({
  baseURL: "https://test.api.sahabatlautlestari.com",
  headers: {
    "x-version": "2.0",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log("Refresh token expired or invalid");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
