"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "make",
    headerName: "make",
    width: 200,
  },
  {
    field: "model",
    headerName: "model",
    width: 200,
  },
  {
    field: "plateNumber",
    headerName: "plateNumber",
    width: 200,
  },
  {
    field: "year",
    headerName: "year",
    width: 200,
  },
];

interface FetchAllCarsProps {}

const FetchAllCars: FC<FetchAllCarsProps> = () => {
  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link
            href={`/dashboard/customers/${params.row.ownerId}`}
            className="text-sky-400 p-2 rounded-md cursor-pointer"
          >
            Owner Info
          </Link>
          <Link
            href={`/dashboard/customers/${params.row.ownerId}/cars/${params.row.id}`}
            className="p-2 text-sky-500 rounded-md cursor-pointer"
          >
            Repair History
          </Link>
        </div>
      ),
    },
  ];

  const getAllCars = async () => {
    const { data } = await axios.get("/api/cars/getAllCars");
    return data.CarData;
  };

  const { data, error, isError, isLoading } = useQuery(
    ["allCars"],
    getAllCars,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  let allCars: [] = [];

  if (data) {
    allCars = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  return (
    <div style={{ height: 520, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default FetchAllCars;