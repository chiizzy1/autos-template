"use client";

import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditRepair from "./EditRepair";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
  customerId: string;
  carId: string;
}

const SingleRepairTable: FC<SingleRepairTableProps> = ({
  customerId,
  carId,
}) => {
  // Instead of passing the repairs data down as prop, fetch it on component load so that
  // whenever a repair is deleted or edited, it's rendered live on the componenet thereby
  // increasing user experience
  const [repairData, setRepairData] = useState([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [fixed, setFixed] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);
  const [estimatedCost, setEstimatedCost] = useState<number>(0.0);
  const [finishDate, setFinishDate] = useState<boolean>(false);
  const [repairId, setRepairId] = useState<string>("");

  const getCarRepairs: any = async (info: any) => {
    console.log(info);
    const { data } = await axios.post(`/api/repairs/getRepair`, info);
    return data.RepairData;
  };

  const { mutate, error, isLoading, isError } = useMutation(getCarRepairs, {
    onSuccess: (successData: []) => {
      console.log(successData);
      setRepairData(successData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    // Function to call on page load
    const getCarRepairs = (data: any) => {
      mutate(data);
    };

    getCarRepairs({ customerId, carId });
    // Call the function on page load

    // refetch data for table if changes occurs in any of the following 
  }, []);

  // add SN to Cars array

  let repairs: any = [];

  if (repairData) {
    repairs = repairData.map((info: any, i: number) => {
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
          <div
            onClick={() => {
              setDescription(params.row.description);
              setFixed(params.row.fixed);
              setPaid(params.row.paid);
              setEstimatedCost(params.row.estimatedCost);
              setFinishDate(params.row.finishDate);
              setRepairId(params.row.id);
              setToggleModal(true);
            }}
            className="p-2 text-sky-500 rounded-md cursor-pointer"
          >
            Edit
          </div>
          <div
            onClick={() => {
              setDeleteToggle(true);
              setRepairId(params.row.id);
            }}
            className="p-2 text-red-500 rounded-md cursor-pointer"
          >
            Delete
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      { repairs && <div style={{ height: 300, width: "100%" }}>
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
      </div>}
      {toggleModal && (
        <EditRepair
          setToggleModal={setToggleModal}
          description={description}
          fixed={fixed}
          paid={paid}
          estimatedCost={estimatedCost}
          finishDate={finishDate}
          repairId={repairId}
          repairStatus="true"
        />
      )}

      {deleteToggle && (
        <DeleteModal repairId={repairId} setDeleteToggle={setDeleteToggle} />
      )}
    </div>
  );
};

export default SingleRepairTable;