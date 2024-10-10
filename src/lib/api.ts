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
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.error("Refresh token tidak ditemukan");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshResponse = await api.post("/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token expired or invalid");

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
