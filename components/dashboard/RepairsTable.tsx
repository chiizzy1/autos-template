"use client"

import { FC } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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


interface RepairsTableProps {
  customerId: string
}

const RepairsTable: FC<RepairsTableProps> = ({ customerId}) => {

  async function allRepairs() {
    const { data } = await axios.get(`/api/repairs/getCustomerRepairs/${customerId}`);
    return data.RepairData;
  }

  const { data, error, isError, isLoading } = useQuery(
    ["allRepairs"],
    allRepairs,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );


  // add SN to repairs array
  let repairs: [] = [];

  if (data) {
    repairs = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }


    const actionColumn: any = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params: any) => (
            <div className="flex gap-4 items-center">
              <div onClick={()=>alert(`Edit button with ID ${params.row.id} clicked!!`)} className="p-2 text-sky-500 rounded-md cursor-pointer">
                Edit
              </div>
              <div onClick={()=> alert(`delete button with ID ${params.row.id} cliked!!`)} className="p-2 text-red-500 rounded-md cursor-pointer">
                Delete
              </div>
            </div>
          ),
        },
      ];
    
      return (
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={repairs}
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

export default RepairsTable