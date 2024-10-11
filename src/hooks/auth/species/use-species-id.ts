import { useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { getSpeciesId } from "@/api/auth/species/get-species-id";

type UseSpeciesByIdOptions = {
  id: string;
  config?: QueryConfig<typeof getSpeciesId>;
};

export const useSpeciesId = ({ id, config }: UseSpeciesByIdOptions) => {
  return useQuery({
    queryKey: ["species", id],
    queryFn: () => getSpeciesId(id),
    ...config,
  });
};
