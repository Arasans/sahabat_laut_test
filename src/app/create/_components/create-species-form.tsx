"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useCreateSpecies } from "@/hooks/auth/species/use-create-species"; // Pastikan path ini benar
import toast from "react-hot-toast";
import {
  SpeciesInput,
  speciesValidation,
} from "@/app/validations/species/species-validation";
import { useRouter } from "next/navigation";

export default function CreateSpeciesForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpeciesInput>({
    resolver: zodResolver(speciesValidation),
  });

  const { mutate: createSpecies, isPending } = useCreateSpecies({
    options: {
      onSuccess: () => {
        toast.success("Species created successfully!");
        router.push("/");
      },
      onError: (error) => {
        toast.error("Failed to create species.");
        console.error("Error creating species:", error);
      },
    },
  });

  const onSubmit = (data: SpeciesInput) => {
    createSpecies(data); // Mengirim data ke API
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Species
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="FAO Code"
          variant="outlined"
          {...register("faoCode")}
          error={!!errors.faoCode}
          helperText={errors.faoCode?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type of Fish"
          variant="outlined"
          {...register("typeOfFish")}
          error={!!errors.typeOfFish}
          helperText={errors.typeOfFish?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Scientific Name"
          variant="outlined"
          {...register("scientificName")}
          error={!!errors.scientificName}
          helperText={errors.scientificName?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="English Name"
          variant="outlined"
          {...register("englishName")}
          error={!!errors.englishName}
          helperText={errors.englishName?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Indonesian Name"
          variant="outlined"
          {...register("indonesianName")}
          error={!!errors.indonesianName}
          helperText={errors.indonesianName?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Local Name"
          variant="outlined"
          {...register("localName")}
          error={!!errors.localName}
          helperText={errors.localName?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type of Water"
          variant="outlined"
          {...register("typeOfWater")}
          error={!!errors.typeOfWater}
          helperText={errors.typeOfWater?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Image URL"
          variant="outlined"
          {...register("imageUrl")}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Status in Indonesia"
          variant="outlined"
          {...register("statusInIndonesia")}
          error={!!errors.statusInIndonesia}
          helperText={errors.statusInIndonesia?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Fish Utilization"
          variant="outlined"
          {...register("fishUtilization")}
          error={!!errors.fishUtilization}
          helperText={errors.fishUtilization?.message}
          margin="normal"
        />
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button type="submit" color="primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create Species"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
