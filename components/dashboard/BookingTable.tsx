"use client";

import { FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";

//  id make model   reason selectedSession[0].time
const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "name",
    headerName: "name",
    width: 200,
  },
  {
    field: "email",
    headerName: "email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "phone",
    width: 200,
  },
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
    field: "year",
    headerName: "year",
    width: 200,
  },
  {
    field: "time",
    headerName: "appointment session",
    width: 200,
  },
  {
    field: "booked",
    headerName: "booked on",
    width: 200,
  },
  {
    field: "reason",
    headerName: "reason",
    width: 200,
  },
];

interface RepairsTableProps {
  data: any;
}

const RepairsTable: FC<RepairsTableProps> = ({ data }) => {
  let bookings: [] = [];

  if (data) {
    bookings = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
        time: new Date(parseInt(info.selectedSession[0].time)).toLocaleString(),
        booked: info.selectedSession[0].bookDate,
      };
    });
  }

//   console.log(bookings);
  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <div
            onClick={() =>
              alert(`Edit button with ID ${params.row.id} clicked!!`)
            }
            className="p-2 text-sky-500 rounded-md cursor-pointer"
          >
            Edit
          </div>
          <div
            onClick={() =>
              alert(`delete button with ID ${params.row.id} cliked!!`)
            }
            className="p-2 text-red-500 rounded-md cursor-pointer"
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={bookings}
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

export default RepairsTable;
