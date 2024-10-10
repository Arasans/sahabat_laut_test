import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { getSpecies } from "@/api/auth/species/get-species";

type UseSpeciesOptions = {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  config?: QueryConfig<typeof getSpecies>;
};

export const useSpecies = ({
  pageNumber,
  pageSize,
  keyword,
  config,
}: UseSpeciesOptions) => {
  return useQuery({
    queryKey: ["species", { pageNumber, pageSize, keyword }],
    queryFn: () => getSpecies(pageNumber, pageSize, keyword),
    placeholderData: keepPreviousData,
    ...config,
  });
};
