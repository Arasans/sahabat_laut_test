"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography, Button, Modal } from "@mui/material";
import {
  EditSpeciesInput,
  editSpeciesValidation,
} from "../validations/species/edit-species-validation";
import { useEditSpecies } from "@/hooks/auth/species/use-edit-species";
import toast from "react-hot-toast";

interface EditSpeciesModalProps {
  id: string;
  open: boolean;
  handleClose: () => void;
  initialData: EditSpeciesInput;
}

export default function EditSpeciesModal({
  id,
  open,
  handleClose,
  initialData,
}: EditSpeciesModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSpeciesInput>({
    resolver: zodResolver(editSpeciesValidation),
    defaultValues: initialData,
  });

  const { mutate: editSpecies, isPending } = useEditSpecies({
    options: {
      onSuccess: () => {
        toast.success("successfully edit");
        handleClose();
      },
      onError: (error) => {
        toast.error("Something Went Wrong Please Try Again");
        console.error("Error updating species:", error);
      },
    },
  });

  const onSubmit = (data: EditSpeciesInput) => {
    editSpecies({ id, data });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96">
        <Typography variant="h6" mb={3}>
          Edit Species
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="FAO Code"
            variant="outlined"
            {...register("faoCode")}
            error={!!errors.faoCode}
            helperText={errors.faoCode?.message}
            defaultValue={initialData.faoCode}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Type of Fish"
            variant="outlined"
            {...register("typeOfFish")}
            error={!!errors.typeOfFish}
            helperText={errors.typeOfFish?.message}
            defaultValue={initialData.typeOfFish}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Scientific Name"
            variant="outlined"
            {...register("scientificName")}
            error={!!errors.scientificName}
            helperText={errors.scientificName?.message}
            defaultValue={initialData.scientificName}
            margin="normal"
          />

          <TextField
            fullWidth
            label="English Name"
            variant="outlined"
            {...register("englishName")}
            error={!!errors.englishName}
            helperText={errors.englishName?.message}
            defaultValue={initialData.englishName}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Indonesian Name"
            variant="outlined"
            {...register("indonesianName")}
            error={!!errors.indonesianName}
            helperText={errors.indonesianName?.message}
            defaultValue={initialData.indonesianName}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            {...register("imageUrl")}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
            defaultValue={initialData.imageUrl}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Type of Water"
            variant="outlined"
            {...register("typeOfWater")}
            error={!!errors.typeOfWater}
            helperText={errors.typeOfWater?.message}
            defaultValue={initialData.typeOfWater}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Status in Indonesia"
            variant="outlined"
            {...register("statusInIndonesia")}
            error={!!errors.statusInIndonesia}
            helperText={errors.statusInIndonesia?.message}
            defaultValue={initialData.statusInIndonesia}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Fish Utilization"
            variant="outlined"
            {...register("fishUtilization")}
            error={!!errors.fishUtilization}
            helperText={errors.fishUtilization?.message}
            defaultValue={initialData.fishUtilization}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary" className="mr-2">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
