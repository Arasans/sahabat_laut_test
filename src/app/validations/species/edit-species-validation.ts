import { z } from "zod";

export const editSpeciesValidation = z.object({
  faoCode: z.string().min(1, "FAO Code is required"),
  typeOfFish: z.string().min(1, "Type of Fish is required"),
  scientificName: z.string().min(1, "Scientific Name is required"),
  englishName: z.string().min(1, "English Name is required"),
  indonesianName: z.string().min(1, "Indonesian Name is required"),
  imageUrl: z.string().url("Invalid URL").optional(),
  typeOfWater: z.string().optional(),
  statusInIndonesia: z.string().optional(),
  fishUtilization: z.string().optional(),
});

export type EditSpeciesInput = z.infer<typeof editSpeciesValidation>;
