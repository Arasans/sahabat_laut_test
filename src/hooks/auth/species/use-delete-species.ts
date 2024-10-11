import { deleteSpecies } from "@/api/auth/species/delete-species";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteSpeciesOptions = {
  options?: MutationConfig<typeof deleteSpecies>;
};

export const useDeleteSpecies = ({ options }: UseDeleteSpeciesOptions) => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationKey: ["delete-species"],
    mutationFn: deleteSpecies,
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
