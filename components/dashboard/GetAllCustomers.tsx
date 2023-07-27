"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "@/helpers/customers";
import SmallHeading from "../ui/SmallHeading";
import Loading from "../ui/Loading";
import Link from "next/link";
import DeleteCustomer from "./DeleteCustomer";
import { Customer } from "@prisma/client";
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
import { DataTable } from "../ui/DataTable";
import EditCustomerInfo from "./EditCustomerInfo";
import NewCarModal from "./NewCarModal";

interface GetAllCustomersProps {}

const GetAllCustomers: FC<GetAllCustomersProps> = ({}) => {
  const [customerId, setCustomerId] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [customerEditModal, setCustomerEditModal] = useState<boolean>(false);
  const [newCarModal, setNewCarModal] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<any>();

  const { data, error, isError, isLoading } = useQuery(
    ["allCustomers"],
    getAllCustomers,
  );

  if (isLoading) {
    return <Loading text="loading customers info" />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  let customersData: any = [];

  if (data) {
    customersData = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  const columns: ColumnDef<Customer>[] = [
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
      accessorKey: "lastName",
      header: () => "Name",
      cell: ({ row }) => {
        const lastName = row.original.lastName;
        const firstName = row.original.firstName;

        return <p>{`${lastName} ${firstName}`}</p>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
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
                <Link href={`/dashboard/customers/${obj.id}`}>View</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCustomerId(obj.id);
                    setCustomerData(obj);
                    setCustomerEditModal(true);
                  }}
                >
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCustomerId(obj.id);
                    setNewCarModal(true);
                  }}
                >
                  Add Car
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setCustomerId(obj.id);
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
      placeholder: "Filter By Email",
      field: "email",
    },
    {
      placeholder: "Filter By Last Name",
      field: "lastName",
    },
  ];

  return (
    <div className="p-4">
      <SmallHeading className="my-4">All Customers</SmallHeading>

      {data && (
        <DataTable
          columns={columns}
          data={customersData}
          filterField={filterField}
        />
      )}
      {customerEditModal && (
        <EditCustomerInfo
          customerId={customerId}
          setCustomerEditModal={setCustomerEditModal}
          customerData={customerData}
        />
      )}
      {newCarModal && (
        <NewCarModal customerId={customerId} setNewCarModal={setNewCarModal} />
      )}
      {toggle && (
        <DeleteCustomer
          customerId={customerId}
          setCustomerDeleteModal={setToggle}
          page="customers"
        />
      )}
    </div>
  );
};

export default GetAllCustomers;
