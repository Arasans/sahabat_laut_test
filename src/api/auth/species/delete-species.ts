import api from "@/lib/api";

export async function deleteSpecies({ id }: { id: string }) {
  const response = await api.delete(`/species/${id}`);
  return response.data;
}
