"use client";

import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "@/helpers/customers";
import SmallHeading from "../ui/SmallHeading";
import Loading from "../ui/Loading";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteCustomer from "./DeleteCustomer";
import SearchBar from "./SearchBar";

interface GetAllCustomersProps {}

const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "fullName",
    headerName: "Name",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
];

const GetAllCustomers: FC<GetAllCustomersProps> = ({}) => {
  const [customerId, setCustomerId] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const { data, error, isError, isLoading } = useQuery(
    ["allCustomers"],
    getAllCustomers,
    {
      onSuccess: (successData) => {
        // console.log(successData);
      },
    }
  );

  if (isLoading) {
    return <Loading text="loading customers info" />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  let customersData: [] = [];

  if (data) {
    customersData = data.map((info: any, i: number) => {
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
      width: 170,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Link href={`/dashboard/customers/${params.row.id}`}>
            <Button variant="hero" className="text-sky-500 border-sky-500">
              View / Edit
            </Button>
          </Link>
          <div
            onClick={() => {
              setCustomerId(params.row.id);
              setToggle(true);
            }}
          >
            <AiOutlineDelete className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <SmallHeading className="my-4">All Customers</SmallHeading>
      <SearchBar />
      {customersData && (
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={customersData}
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
      )}
      {toggle && <DeleteCustomer customerId={customerId} setCustomerDeleteModal={setToggle} page="customers" /> }
    </div>
  );
};

export default GetAllCustomers;
