"use client";

import { FC, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteCar from "./DeleteCar";

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

interface CarsTableProps {
  customerId: string;
}

const CarsTable: FC<CarsTableProps> = ({ customerId }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [carId, setCarId] = useState<string>("");

  async function customerCars() {
    const { data } = await axios.get(`/api/cars/getCustomerCars/${customerId}`);
    return data.CarData;
  }

  const { data, error, isError, isLoading } = useQuery(
    ["customerCars"],
    customerCars,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );

  // add SN to repairs array
  let cars: [] = [];

  if (data) {
    cars = data.map((info: any, i: number) => {
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
          <Link href={`/dashboard/cars/${params.row.id}`}>
            <Button variant="hero" className="text-sky-500 border-sky-500">
              View / Edit
            </Button>
          </Link>
          <div
            onClick={() => {
              setCarId(params.row.id);
              setToggle(true);
            }}
          >
            <AiOutlineDelete className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
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
      {toggle && <DeleteCar carId={carId} setDeleteModal={setToggle} />}
    </>
  );
};

export default CarsTable;
