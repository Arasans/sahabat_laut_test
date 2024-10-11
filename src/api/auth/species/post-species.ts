import { SpeciesInput } from "@/app/validations/species/species-validation";
import api from "@/lib/api";

export async function postSpecies(data: SpeciesInput) {
  const response = await api.post("/species", data);
  return response.data;
}
