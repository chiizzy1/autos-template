"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DeleteCar from "./DeleteCar";

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
import { CarDetails } from "@prisma/client";
import { DataTable } from "../ui/DataTable";
import CreateRepairModal from "./CreateRepairModal";
import EditCar from "./EditCar";
import Loading from "../ui/Loading";

interface CarsTableProps {
  customerId: string;
}

const CarsTable: FC<CarsTableProps> = ({ customerId }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [carId, setCarId] = useState<string>("");
  const [toggleRepair, setToggleRepair] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [carData, setCarData] = useState<any>();

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

  const columns: ColumnDef<CarDetails>[] = [
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
      accessorKey: "make",
      header: "Make",
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "plateNumber",
      header: "Plate Number",
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
                <Link href={`/dashboard/cars/${obj.id}`}>View</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCarId(obj.id);
                    setCarData(obj);
                    setEditModal(true);
                  }}
                >
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCarId(obj.id);
                    setToggleRepair(true);
                  }}
                >
                  Add repair
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCarId(obj.id);
                    setToggle(true);
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
      placeholder: "Filter By Plate Number",
      field: "plateNumber",
    },
  ];

  return (
    <>
      {data && (
        <DataTable columns={columns} data={cars} filterField={filterField} />
      )}
      {toggleRepair && (
        <CreateRepairModal carId={carId} setToggleModal={setToggleRepair} />
      )}
      {editModal && (
        <EditCar carId={carId} carData={carData} setEditModal={setEditModal} />
      )}
      {toggle && <DeleteCar carId={carId} setDeleteModal={setToggle} />}
    </>
  );
};

export default CarsTable;
