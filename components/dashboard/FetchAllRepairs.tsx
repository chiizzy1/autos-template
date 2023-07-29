"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Loading from "../ui/Loading";
import SmallHeading from "../ui/SmallHeading";
import { Button } from "../ui/Button";
import DeleteModal from "./DeleteModal";
import RepairDetails from "./RepairDetails";
import EditRepair from "./EditRepair";

import { ColumnDef } from "@tanstack/react-table";
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

interface FetchAllRepairsProps {}

const FetchAllRepairs: FC<FetchAllRepairsProps> = ({}) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [repairId, setRepairId] = useState<string>("");
  const [repairDetails, setRepairDetails] = useState<any>();
  const [viewRepair, setViewRepair] = useState<boolean>(false);

  const getAllRepairs = async () => {
    const { data } = await axios.get("/api/repairs/getAllRepairs");
    return data.RepairData;
  };

  const { data, error, isError, isLoading } = useQuery(
    ["allRepairs"],
    getAllRepairs
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
      header: "Paid",
    },
    {
      accessorKey: "fixed",
      header: "Fixed",
    },
    {
      accessorKey: "delivered",
      header: "Delivered",
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
                onClick={() => navigator.clipboard.writeText(obj.trackId)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/cars/${obj.carId}`}>View Car</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/customers/${obj.customerId}`}>
                  View Customer
                </Link>
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
    <div className="p-4">
      {isLoading && <Loading text="Loading repairs data" />}
      {data && (
        <>
          <SmallHeading className="py-4">Latest repairs</SmallHeading>

          <DataTable
            columns={columns}
            data={allRepairsData}
            filterField={filterField}
          />
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

      {viewRepair && (
        <RepairDetails
          repairDetails={repairDetails}
          setViewRepair={setViewRepair}
        />
      )}
    </div>
  );
};

export default FetchAllRepairs;
