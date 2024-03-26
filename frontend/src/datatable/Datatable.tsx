import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";

const Datatable = () => {
  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      width: 400,
      editable: true,
      cellClassName: "font-normal",
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 400,
      editable: true,
      cellClassName: "font-normal",
    },

  ];


 


  const { data, isLoading, isError } = useQuery("students", apiClient.getAllStudents);

  useEffect(() => {
    console.log("Fetched Data:", data); // Logging the fetched data
  }, [data]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

 



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const getRowId = (data: { _id: string; }) => data._id;

  return (
    <div>
  
        <div className="bg-white shadow-md rounded-md p-[20px]">
          <Typography variant="h4" mb={3}>
            Registered Students
          </Typography>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              getRowId={getRowId}
              slots={{ toolbar: CustomToolbar }}
              className="border"
            />
          </Box>
        </div>
    </div>
  );
};

export default Datatable;
