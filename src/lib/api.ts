"use server";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: "https://test.api.sahabatlautlestari.com",
  headers: {
    "x-version": "2.0",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = cookies().get("token");
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

      try {
        const refreshToken = cookies().get("refreshToken");
        if (!refreshToken) {
          console.error("Refresh token tidak ditemukan");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshResponse = await api.post("/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        cookies().set("token", newAccessToken);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token expired or invalid");

        cookies().set("token", "", { expires: new Date(0) });
        cookies().set("refreshToken", "", { expires: new Date(0) });

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
