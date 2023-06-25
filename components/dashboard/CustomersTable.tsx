"use client";

import { FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";


const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "fullName",
    headerName: "Name",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];

interface CustomersTableProps {
  data: any;
}

const CustomersTable: FC<CustomersTableProps> = ({ data }) => {
  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link href={`/dashboard/customers/${params.row.id}`} className="text-sky-400 p-2 rounded-md cursor-pointer">View</Link>
          <div className="p-2 text-red-500 rounded-md cursor-pointer">
            Delete
          </div>
        </div>
      ),
    },
  ];

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

export default CustomersTable;