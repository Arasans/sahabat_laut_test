import api from "@/lib/api";
import { Species } from "./get-species";

export async function getSpeciesId(id: string): Promise<Species> {
  const response = await api.get(`/species/${id}`);
  return response.data;
}
