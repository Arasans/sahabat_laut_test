import { LoginInput } from "@/app/validations/auth/login-validation";
import api from "@/lib/api";

interface LoginResponse {
  accessToken: string;
}

export default async function postLogin(
  data: LoginInput
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  console.log("Login Response:", response.data);
  return response.data;
}
