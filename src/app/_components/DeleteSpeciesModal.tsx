"use client";

import { useDeleteSpecies } from "@/hooks/auth/species/use-delete-species";
import { Modal, Box, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";

interface DeleteSpeciesModalProps {
  id: string;
  open: boolean;
  handleClose: () => void;
}

export default function DeleteSpeciesModal({
  id,
  open,
  handleClose,
}: DeleteSpeciesModalProps) {
  const { mutate: deleteSpecies, isPending } = useDeleteSpecies({
    options: {
      onSuccess: () => {
        toast.success("successfully delete");
        handleClose();
      },
      onError: (error) => {
        toast.error("Something Went Wrong Please Try Again");
        console.error("Error deleteing species:", error);
      },
    },
  });

  const handleDelete = () => {
    deleteSpecies({ id });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h6" className="mb-4">
          Confirm Delete
        </Typography>
        <Typography variant="body1" className="mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone. ID= {id}
        </Typography>
        <Box className="flex justify-end space-x-4">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
