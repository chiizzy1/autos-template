"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditRepair from "./EditRepair";
import DeleteModal from "./DeleteModal";
import RepairDetails from "./RepairDetails";

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
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Repair } from "@prisma/client";
import { DataTable } from "../ui/DataTable";
import { toast } from "../ui/toast";

interface RepairsTableProps {
  customerId: string;
}

const RepairsTable: FC<RepairsTableProps> = ({ customerId }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [repairId, setRepairId] = useState<string>("");
  const [repairDetails, setRepairDetails] = useState<any>();
  const [viewRepair, setViewRepair] = useState<boolean>(false);

  async function allRepairs() {
    const { data } = await axios.get(
      `/api/repairs/getCustomerRepairs/${customerId}`
    );
    return data.RepairData;
  }

  const { data, error, isError, isLoading } = useQuery(
    ["allRepairs"],
    allRepairs
  );

  if (isError) {
    <p>Error loading table!</p>;
  }
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
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(obj.trackId);
                  toast({
                    title: "Copied",
                    message: "Tracking ID copied to clipboard",
                    type: "success",
                  });
                }}
              >
                Copy Tracking ID
              </DropdownMenuItem>
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
    <>
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
    </>
  );
};

export default RepairsTable;
