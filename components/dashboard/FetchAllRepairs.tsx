"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Loading from "../ui/Loading";
import SmallHeading from "../ui/SmallHeading";
import { Button } from "../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "./DeleteModal";

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
  const [toggle, setToggle] = useState<boolean>(false);
  const [repairId, setRepairId] = useState<string>("");

  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link href={`/dashboard/cars/${params.row.carId}`}>
            <Button variant="hero" className="text-sky-500 border-sky-500">
              car info
            </Button>
          </Link>
          <Link href={`/dashboard/customers/${params.row.customerId}`}>
            <Button variant="hero" className="text-sky-500 border-sky-500">
              owner info
            </Button>
          </Link>
          <div
            onClick={() => {
              setRepairId(params.row.id);
              setToggle(true);
            }}
          >
            <AiOutlineDelete className="text-red-500 text-2xl cursor-pointer" />
          </div>
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
    <>
      {isLoading && <Loading text="Loading repairs data" />}
      {data && (
        <>
          <SmallHeading className="py-4">Latest repairs</SmallHeading>
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
        </>
      )}
      {toggle && (
        <DeleteModal repairId={repairId} setDeleteToggle={setToggle} />
      )}
    </>
  );
};

export default FetchAllRepairs;
