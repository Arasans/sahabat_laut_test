import { postLogin } from "@/api/auth/post-login";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

type UseLoginOptions = {
  options?: MutationConfig<typeof postLogin>;
};

export const useLogin = ({ options }: UseLoginOptions) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
    ...options,
  });
};
