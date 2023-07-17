"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Loading from "../ui/Loading";
import { Button } from "../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteCar from "./DeleteCar";

const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "make",
    headerName: "make",
    width: 150,
  },
  {
    field: "model",
    headerName: "model",
    width: 150,
  },
  {
    field: "plateNumber",
    headerName: "plateNumber",
    width: 150,
  },
  {
    field: "year",
    headerName: "year",
    width: 100,
  },
];

interface FetchAllCarsProps {}

const FetchAllCars: FC<FetchAllCarsProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [carId, setCarId] = useState<string>("");

  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link href={`/dashboard/customers/${params.row.ownerId}`}>
            <Button variant="hero" className="text-sky-500 border-sky-500">
              Owner Info
            </Button>
          </Link>
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
    <>
      {isLoading && <Loading text="Loading cars" />}
      {allCars && (
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={allCars}
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
      )}
      {toggle && <DeleteCar carId={carId} setDeleteModal={setToggle} />}
    </>
  );
};

export default FetchAllCars;
