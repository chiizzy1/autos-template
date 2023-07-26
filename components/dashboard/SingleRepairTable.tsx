"use client";

import { FC, useState } from "react";
import EditRepair from "./EditRepair";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import RepairDetails from "./RepairDetails";

import {  Repair } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { Checkbox } from "../ui/Checkbox";
import { DataTable } from "../ui/DataTable";
import Loading from "../ui/Loading";

interface SingleRepairTableProps {
  carId: string;
}

const SingleRepairTable: FC<SingleRepairTableProps> = ({ carId }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [repairId, setRepairId] = useState<string>("");
  const [repairDetails, setRepairDetails] = useState<any>();
  const [viewRepair, setViewRepair] = useState<boolean>(false);

  const { refresh } = useRouter();

  async function fetchCarRepairsData() {
    const { data } = await axios.get(`/api/repairs/getCarRepairs/${carId}`);
    return data.RepairData;
  }

  const { data, isError, isLoading } = useQuery(
    ["carRepairHistory"],
    fetchCarRepairsData,
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

  if (isError) {
    <p>Error loading data!</p>
  }

  const columns: ColumnDef<Repair>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "sn",
      header: "SN",
    },
    {
      accessorKey: "description",
      header: "Diagnostic description",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[300px] truncate">
              {row.getValue("description")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "estimatedCost",
      header: "Cost",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("estimatedCost"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <p>{formatted}</p>;
      },
    },
    {
      accessorKey: "paid",
      header: "Payment Status",
    },
    {
      accessorKey: "fixed",
      header: "Repair Status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const obj = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setRepairDetails(obj);
                    setViewRepair(true);
                  }}
                >
                  View
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setRepairDetails(obj);
                    setToggleModal(true);
                  }}
                >
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setDeleteToggle(true);
                    setRepairId(obj.id);
                  }}
                >
                  <Trash className="mr-4" /> Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filterField = [
    {
      placeholder: "Filter By Diagnostic",
      field: "description",
    },
  ];
  return (
    <div className="p-4">
      {data && (
        <DataTable columns={columns} data={repairs} filterField={filterField} />
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

      {viewRepair && (
        <RepairDetails
          repairDetails={repairDetails}
          setViewRepair={setViewRepair}
        />
      )}
    </div>
  );
};

export default SingleRepairTable;
