"use server";
import api from "@/lib/api";

interface SpeciesDetailResponse {
  id: string;
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: null;
  statusInIndonesia: string;
  fishUtilization: string;
}

export async function getSpeciesId(id: string): Promise<SpeciesDetailResponse> {
  const response = await api.get(`/species/${id}`);
  return response.data;
}
