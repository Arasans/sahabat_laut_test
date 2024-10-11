import { z } from "zod";

export const speciesValidation = z.object({
  faoCode: z.string().min(1, { message: "FAO Code is required" }),
  typeOfFish: z.string().min(1, { message: "Type of Fish is required" }),
  scientificName: z.string().min(1, { message: "Scientific Name is required" }),
  englishName: z.string().min(1, { message: "English Name is required" }),
  indonesianName: z.string().min(1, { message: "Indonesian Name is required" }),
  localName: z.string().optional(),
  typeOfWater: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  statusInIndonesia: z
    .string()
    .min(1, { message: "Status in Indonesia is required" }),
  fishUtilization: z
    .string()
    .min(1, { message: "Fish Utilization is required" }),
});

export type SpeciesInput = z.infer<typeof speciesValidation>;


