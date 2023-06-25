"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "description",
    headerName: "description",
    width: 200,
  },
  {
    field: "estimatedCost",
    headerName: "estimatedCost",
    width: 200,
  },
  {
    field: "trackId",
    headerName: "trackId",
    width: 200,
  },
  {
    field: "paid",
    headerName: "paid",
    width: 200,
  },
  {
    field: "fixed",
    headerName: "fixed",
    width: 200,
  },
  {
    field: "startDate",
    headerName: "startDate",
    width: 200,
  },
  {
    field: "finishDate",
    headerName: "finishDate",
    width: 200,
  },
];

interface FetchAllRepairsProps {}

const FetchAllRepairs: FC<FetchAllRepairsProps> = ({}) => {
  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link
            href={`/dashboard/customers/${params.row.customerId}`}
            className="text-sky-400 p-2 rounded-md cursor-pointer"
          >
            Owner Info
          </Link>
          <Link
            href={`/dashboard/customers/${params.row.customerId}/cars/${params.row.carId}`}
            className="p-2 text-sky-500 rounded-md cursor-pointer"
          >
            Car Info
          </Link>
        </div>
      ),
    },
  ];

  const getAllRepairs = async () => {
    const { data } = await axios.get("/api/repairs/getAllRepairs");
    return data.RepairData;
  };

  const { data, error, isError, isLoading } = useQuery(
    ["allRepairs"],
    getAllRepairs,
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

  let allRepairsData: [] = [];

  if (data) {
    allRepairsData = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={allRepairsData}
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

export default FetchAllRepairs;