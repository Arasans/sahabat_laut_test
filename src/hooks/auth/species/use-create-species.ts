import { postSpecies } from "@/api/auth/species/post-species";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateSpeciesOptions = {
  options?: MutationConfig<typeof postSpecies>;
};

export const useCreateSpecies = ({ options }: UseCreateSpeciesOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-species"],
    mutationFn: postSpecies,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["species"],
      });

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
