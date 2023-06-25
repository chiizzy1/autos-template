"use client"

import { FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";


const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
//   {
//     field: "fullName",
//     headerName: "Name",
//     description: "This column has a value getter and is not sortable.",
//     width: 200,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
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


interface CarsTableProps {
  cars: any
  customerId: string
}

const CarsTable: FC<CarsTableProps> = ({cars, customerId}) => {
  
    const actionColumn: any = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params: any) => (
            <div className="flex gap-4 items-center">
              <Link href={`/dashboard/customers/${customerId}/cars/${params.row.id}`} className="text-sky-400 p-2 rounded-md cursor-pointer">View</Link>
              <div onClick={() => alert(`delete button for ${params.row.id} clicked`)} className="p-2 text-red-500 rounded-md cursor-pointer">
                Delete
              </div>
            </div>
          ),
        },
      ];
    
      return (
        <div style={{ height: 300, width: "100%" }}>          
          <DataGrid
            rows={cars}
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
}

export default CarsTable