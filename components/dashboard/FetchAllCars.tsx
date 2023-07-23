"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Loading from "../ui/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteCar from "./DeleteCar";

import { CarDetails } from "@prisma/client";
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
import { ArrowUpDown, MoreHorizontal, Trash, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTable } from "../ui/DataTable";
import SmallHeading from "../ui/SmallHeading";
import CreateRepairModal from "./CreateRepairModal";
import EditCar from "./EditCar";

interface FetchAllCarsProps {}

const FetchAllCars: FC<FetchAllCarsProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleRepair, setToggleRepair] = useState<boolean>(false);
  const [carId, setCarId] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [carData, setCarData] = useState<any>();

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
                <Link href={`/dashboard/customers/${obj.ownerId}`}>
                  View Customer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/cars/${obj.id}`}>View Car</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCarId(obj.id);
                    setCarData(obj);
                    setEditModal(true);
                  }}
                >
                  Edit details
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCarId(obj.id);
                    setToggleRepair(true);
                  }}
                >
                  <Wrench className="mr-4" />
                  Add Repair
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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

  const filterField = [
    {
      placeholder: "Filter By Plate Number",
      field: "plateNumber",
    },
  ];

  return (
    <>
      {isLoading && <Loading text="Loading cars" />}
      {allCars.length > 0 && (
        <div className="p-4">
          <SmallHeading className="py-4">
            See all cars in our database
          </SmallHeading>
          <DataTable
            columns={columns}
            data={allCars}
            filterField={filterField}
          />
        </div>
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

export default FetchAllCars;
