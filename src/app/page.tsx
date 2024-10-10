"use client";

import { useState } from "react";
import { Container, Typography, Box, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Navbar from "./_components/navbar";
import { useSpecies } from "@/hooks/auth/species/use-species"; // Ensure the import is correct

export default function Home() {
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    keyword: "",
  });

  const { data, isLoading, isError, error } = useSpecies({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    keyword: pagination.keyword || undefined,
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "faoCode", headerName: "FAO Code", width: 120 },
    { field: "typeOfFish", headerName: "Type of Fish", width: 150 },
    { field: "scientificName", headerName: "Scientific Name", width: 200 },
    { field: "englishName", headerName: "English Name", width: 200 },
    { field: "indonesianName", headerName: "Indonesian Name", width: 200 },
    {
      field: "statusInIndonesia",
      headerName: "Status in Indonesia",
      width: 200,
    },
    { field: "fishUtilization", headerName: "Utilization", width: 150 },
  ];

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: model.page,
      pageSize: model.pageSize,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({
      ...prev,
      keyword: e.target.value,
      pageNumber: 0,
    }));
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" className="pt-5">
        <Typography variant="h4" component="h1" gutterBottom>
          Species List
        </Typography>

        {/* Search Bar */}
        <Box my={2}>
          <TextField
            label="Search species"
            variant="outlined"
            fullWidth
            value={pagination.keyword}
            onChange={handleSearch}
            className="mb-4"
          />
        </Box>

        {isError && (
          <Typography variant="body1" color="error">
            Failed to fetch data: {error?.message || "Unknown error"}
          </Typography>
        )}

        <div className="flex flex-col h-auto">
          <DataGrid
            rows={data?.data || []}
            columns={columns}
            rowCount={data ? data.totalRecords : 0}
            paginationMode="server"
            paginationModel={{
              page: pagination.pageNumber,
              pageSize: pagination.pageSize,
            }}
            onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={[5, 10, 15, 20]}
            loading={isLoading}
            autoHeight
          />
        </div>
      </Container>
    </>
  );
}
