"use client";

import { FC, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditRepair from "./EditRepair";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/Button";

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

interface SingleRepairTableProps {
  carId: string;
}

const SingleRepairTable: FC<SingleRepairTableProps> = ({ carId }) => {
  // Instead of passing the repairs data down as prop, fetch it on component load so that
  // whenever a repair is deleted or edited, it's rendered live on the componenet thereby
  // increasing user experience

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [repairId, setRepairId] = useState<string>("");
  const [repairDetails, setRepairDetails] = useState<any>();

  const { refresh } = useRouter();

  async function fetchCarRepairsData() {
    const { data } = await axios.get(`/api/repairs/getCarRepairs/${carId}`);
    return data.RepairData;
  }

  const { data, isLoading } = useQuery(
    ["carRepairHistory"],
    fetchCarRepairsData,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );

  // add SN to Cars array

  let repairs: any = [];

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
          <Button
            variant="hero"
            className="text-sky-500 border-sky-500"
            onClick={() => {
              setToggleModal(true);
              setRepairDetails(params.row);
            }}
          >
            View / Edit
          </Button>

          <div
            onClick={() => {
              setDeleteToggle(true);
              setRepairId(params.row.id);
            }}
          >
            <AiOutlineDelete className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      {repairs && (
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={repairs}
            columns={columns.concat(actionColumn)}
            autoHeight={true}
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
      {toggleModal && (
        <EditRepair
          setToggleModal={setToggleModal}
          repairDetails={repairDetails}
        />
      )}

      {deleteToggle && (
        <DeleteModal repairId={repairId} setDeleteToggle={setDeleteToggle} />
      )}
    </div>
  );
};

export default SingleRepairTable;
