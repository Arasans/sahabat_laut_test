"use server";
import { LoginInput } from "@/app/validations/auth/login-validation";
import api from "@/lib/api";
import { cookies } from "next/headers";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function postLogin(data: LoginInput): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const { accessToken, refreshToken } = response.data;

  cookies().set("token", accessToken);
  cookies().set("refreshToken", refreshToken);

  return response.data;
}
