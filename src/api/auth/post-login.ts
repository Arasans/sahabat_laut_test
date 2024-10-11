import { LoginInput } from "@/app/validations/auth/login-validation";
import api from "@/lib/api";
import Cookies from "js-cookie";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function postLogin(data: LoginInput): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const { accessToken, refreshToken } = response.data;

  Cookies.set("token", accessToken);
  Cookies.set("refreshToken", refreshToken);

  return response.data;
}
