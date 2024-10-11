import { EditSpeciesInput } from "@/app/validations/species/edit-species-validation";
import api from "@/lib/api";

export async function putSpecies({
  id,
  data,
}: {
  id: string;
  data: EditSpeciesInput;
}) {
  const response = await api.put(`/species/${id}`, data);
  return response.data;
}
