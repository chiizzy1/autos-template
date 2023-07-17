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
import RepairDetails from "./RepairDetails";
import EditRepair from "./EditRepair";


const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "description",
    headerName: "Diagnosis",
    width: 200,
  },
  {
    field: "estimatedCost",
    headerName: "Cost",
    width: 200,
  },
  {
    field: "paid",
    headerName: "paid",
    width: 100,
  },
  {
    field: "fixed",
    headerName: "fixed",
    width: 100,
  },
];


interface FetchAllRepairsProps {}

const FetchAllRepairs: FC<FetchAllRepairsProps> = ({}) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [repairId, setRepairId] = useState<string>("");
  const [repairDetails, setRepairDetails] = useState<any>();
  const [viewRepair, setViewRepair] = useState<boolean>(false)


  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
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
          <Button
            variant="hero"
            className="text-sky-500 border-sky-500"
            onClick={() => {
              setRepairDetails(params.row);
              setViewRepair(true);
            }}
          >
            View
          </Button>
          <Button
            variant="hero"
            className="text-sky-500 border-sky-500"
            onClick={() => {
              setRepairDetails(params.row);
              setToggleModal(true);
            }}
          >
            Edit
          </Button>
          <div
            onClick={() => {
              setRepairId(params.row.id);
              setDeleteToggle(true);
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
      {toggleModal && (
        <EditRepair
          setToggleModal={setToggleModal}
          repairDetails={repairDetails}
        />
      )}

      {deleteToggle && (
        <DeleteModal repairId={repairId} setDeleteToggle={setDeleteToggle} />
      )}

      {viewRepair && <RepairDetails repairDetails={repairDetails} setViewRepair={setViewRepair} /> }
    </>
  );
};

export default FetchAllRepairs;
