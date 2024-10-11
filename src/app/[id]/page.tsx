"use client";

import { useSpeciesId } from "@/hooks/auth/species/use-species-id";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export default function SpeciesDetail({ params }: { params: Params }) {
  const { id } = params;

  const { data, isLoading, isError } = useSpeciesId({ id });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return notFound();
  }

  return (
    <Box display="flex" justifyContent="center" pt={5}>
      <Card sx={{ maxWidth: 800 }}>
        <CardMedia>
          <Image
            src={data.imageUrl || "https://via.placeholder.com/800x400"}
            alt={data.englishName}
            width={800}
            height={400}
            className="object-cover"
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {data.englishName} - {data.scientificName}
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              <strong>Indonesian Name:</strong> {data.indonesianName}
            </Typography>
            <Typography variant="body1">
              <strong>Local Name:</strong> {data.localName}
            </Typography>
            <Typography variant="body1">
              <strong>FAO Code:</strong> {data.faoCode}
            </Typography>
            <Typography variant="body1">
              <strong>Type of Fish:</strong> {data.typeOfFish}
            </Typography>
            <Typography variant="body1">
              <strong>Status in Indonesia:</strong> {data.statusInIndonesia}
            </Typography>
            <Typography variant="body1">
              <strong>Utilization:</strong> {data.fishUtilization}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
