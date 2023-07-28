"use client";

import { FC, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../ui/Loading";
import { Button } from "../ui/Button";
import BookingDetails from "./BookingDetails";
import DeleteBooking from "./DeleteBooking";

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
import { AppointmentClient } from "@prisma/client";
import { DataTable } from "../ui/DataTable";
import SmallHeading from "../ui/SmallHeading";
import EditOpenCloseDays from "./EditOpenCloseDays";

interface BookingTableProps {}

const BookingTable: FC<BookingTableProps> = () => {
  const [bookingDetails, setBookingDetails] = useState<any>();
  const [bookingId, setBookingId] = useState<string>("");
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Update appointment to viewed when viewed
  const updateViewed = async (id: string) => {
    const { data } = await axios.put(`/api/booking/viewed/${id}`);
    return data.updated;
  };

  const { mutate: viewed } = useMutation(updateViewed);

  // Fetch all Booking data
  const getAllBookings = async () => {
    const { data } = await axios.get("/api/booking/getAllBookings");
    return data.bookingsData;
  };

  const { data, error, isError, isLoading } = useQuery(
    ["allBookings"],
    getAllBookings
  );

  let bookings: any = [];

  if (data) {
    bookings = data.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
        time: new Date(parseInt(info.selectedSession[0].time)).toLocaleString(),
        booked: info.selectedSession[0].bookDate,
      };
    });
  }

  const columns: ColumnDef<AppointmentClient>[] = [
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
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "time",
      header: "Appointment Time",
    },
    {
      accessorKey: "viewed",
      header: "status",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge variant={row.getValue("viewed") ? "secondary" : "view"}>
              {row.getValue("viewed") ? "viewed" : "view"}
            </Badge>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
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
                    setBookingDetails(obj);
                    setToggleDetails(true);
                    obj.viewed ? "" : viewed(obj.id);
                  }}
                >
                  View Booking Details
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  onClick={() => {
                    setBookingId(obj.id);
                    setDeleteModal(true);
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
      placeholder: "Filter By Name",
      field: "name",
    },
    {
      placeholder: "Filter By Email",
      field: "email",
    },
  ];

  return (
    <div className="p-4">
      {isLoading && <Loading text="loading appointments" />}

      {data && (
        <>
          <SmallHeading className="py-4">
            Edit Opening/Closing dates!
          </SmallHeading>

          <EditOpenCloseDays />

          <SmallHeading className="pb-4 pt-8">
            See all appointments!!
          </SmallHeading>
          <DataTable
            columns={columns}
            data={bookings}
            filterField={filterField}
          />
        </>
      )}
      {toggleDetails && (
        <BookingDetails
          bookingDetails={bookingDetails}
          setToggleDetails={setToggleDetails}
        />
      )}
      {deleteModal && (
        <DeleteBooking bookingId={bookingId} setDeleteModal={setDeleteModal} />
      )}
    </div>
  );
};

export default BookingTable;
