import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { putSpecies } from "@/api/auth/species/put-species";

type UseEditSpeciesOptions = {
  options?: MutationConfig<typeof putSpecies>;
};

export const useEditSpecies = ({ options }: UseEditSpeciesOptions) => {
  return useMutation({
    mutationKey: ["edit-species"],
    mutationFn: putSpecies,
    ...options,
  });
};
