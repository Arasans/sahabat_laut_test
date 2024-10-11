import api from "@/lib/api";

export interface Species {
  id: string;
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: string | null;
  statusInIndonesia: string;
  fishUtilization: string;
}

interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: T[];
}

export async function getSpecies(
  pageNumber: number,
  pageSize: number,
  keyword?: string
): Promise<PaginatedResponse<Species>> {
  const response = await api.get<PaginatedResponse<Species>>("/species", {
    params: {
      pageNumber,
      pageSize,
      keyword,
    },
  });
  return response.data;
}
