"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Navbar from "./_components/navbar";
import { useSpecies } from "@/hooks/auth/species/use-species";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Species } from "@/api/auth/species/get-species";
import EditSpeciesModal from "./_components/EditSpeciesModal";
import DeleteSpeciesModal from "./_components/DeleteSpeciesModal";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    setToken(tokenFromCookie);
  }, []);

  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    keyword: "",
  });

  const { data, isLoading, isFetching, isError, error } = useSpecies({
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const actions = [
          <GridActionsCellItem
            key="view"
            icon={
              <Tooltip title="View">
                <PageviewIcon />
              </Tooltip>
            }
            label="View"
            onClick={() => router.push(`/${id}`)}
            color="inherit"
          />,
        ];

        if (token) {
          actions.push(
            <GridActionsCellItem
              key="edit"
              icon={
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              }
              label="Edit"
              className="textPrimary"
              onClick={() => {
                handleModalClick(id as string, true);
              }}
              color="inherit"
            />,
            <GridActionsCellItem
              key="delete"
              icon={
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              }
              label="Delete"
              className="textPrimary"
              onClick={() => {
                handleModalClick(id as string, false);
              }}
              color="inherit"
            />
          );
        }

        return actions;
      },
    },
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

  const handleModalClick = (id: string, isEdit: boolean) => {
    const speciesToEdit =
      data?.data.find((species) => species.id === id) || null;
    setSelectedSpecies(speciesToEdit);
    if (isEdit) {
      setOpenEdit(true);
    } else {
      setOpenDelete(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" className="pt-5">
        <Typography variant="h4" component="h1" gutterBottom>
          Species List
        </Typography>

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
            loading={isLoading || isFetching}
            autoHeight
          />
        </div>
      </Container>

      {selectedSpecies && (
        <EditSpeciesModal
          id={selectedSpecies.id}
          open={openEdit}
          handleClose={handleCloseEdit}
          initialData={{
            faoCode: selectedSpecies.faoCode,
            typeOfFish: selectedSpecies.typeOfFish,
            scientificName: selectedSpecies.scientificName,
            englishName: selectedSpecies.englishName,
            indonesianName: selectedSpecies.indonesianName,
            imageUrl: selectedSpecies.imageUrl || undefined,
            typeOfWater: selectedSpecies.typeOfWater || undefined,
            statusInIndonesia: selectedSpecies.statusInIndonesia || undefined,
            fishUtilization: selectedSpecies.fishUtilization || undefined,
          }}
        />
      )}
      {selectedSpecies && (
        <DeleteSpeciesModal
          handleClose={handleCloseDelete}
          open={openDelete}
          id={selectedSpecies.id}
        />
      )}
    </>
  );
}
