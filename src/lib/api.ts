import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const api = axios.create({
  baseURL: "https://test.api.sahabatlautlestari.com",
  headers: {
    "x-version": "2.0",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        console.error("Refresh token tidak ditemukan");
        Router.push("/login");
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await api.post("/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;
        Cookies.set("token", newAccessToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token expired or invalid", err);

        Cookies.remove("token");
        Cookies.remove("refreshToken");

        Router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
