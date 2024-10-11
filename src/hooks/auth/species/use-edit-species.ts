import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { putSpecies } from "@/api/auth/species/put-species";

type UseEditSpeciesOptions = {
  options?: MutationConfig<typeof putSpecies>;
};

export const useEditSpecies = ({ options }: UseEditSpeciesOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-species"],
    mutationFn: putSpecies,
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
