"use client";

import { FC, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../ui/Loading";
import { Button } from "../ui/Button";
import { AiOutlineDelete } from "react-icons/ai";
import BookingDetails from "./BookingDetails";
import DeleteBooking from "./DeleteBooking";

//  id make model   reason selectedSession[0].time
const columns: GridColDef[] = [
  { field: "sn", headerName: "SN", width: 70 },
  {
    field: "name",
    headerName: "name",
    width: 200,
  },
  {
    field: "email",
    headerName: "email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "phone",
    width: 200,
  },
  // {
  //   field: "make",
  //   headerName: "make",
  //   width: 200,
  // },
  // {
  //   field: "model",
  //   headerName: "model",
  //   width: 200,
  // },
  // {
  //   field: "year",
  //   headerName: "year",
  //   width: 200,
  // },
  {
    field: "time",
    headerName: "appointment session",
    width: 200,
  },
  // {
  //   field: "booked",
  //   headerName: "booked on",
  //   width: 200,
  // },
  // {
  //   field: "reason",
  //   headerName: "reason",
  //   width: 200,
  // },
];

interface RepairsTableProps {}

const RepairsTable: FC<RepairsTableProps> = () => {
  const [bookingDetails, setBookingDetails] = useState<[] | null>(null);
  const [bookingId, setBookingId] = useState<string>("");
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Update appointment to viewed when viewed

  const updateViewed = async (info: string) => {
    console.log("id:", info);
    const { data } = await axios.put(`/api/booking/viewed/${info}`);
    return data.updated;
  };

  const { mutate: viewed } = useMutation(updateViewed, {
    onSuccess: (successData) => {
      console.log(successData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Fetch all Booking data
  const getAllBookings = async () => {
    const { data } = await axios.get("/api/booking/getAllBookings");
    return data.bookingsData;
  };

  const { data, error, isError, isLoading } = useQuery(
    ["allBookings"],
    getAllBookings,
    {
      onSuccess: (successData) => {
        console.log(successData);
      },
    }
  );

  let bookings: [] = [];

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

  const actionColumn: any = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => {
              setBookingDetails(params.row);
              setToggleDetails(true);
              params.row.viewed ? "" : viewed(params.row.id);
            }}
            variant="hero"
            className={`${
              params.row.viewed ? "bg-green-500" : "bg-red-500"
            } border-sky-500`}
          >
            view details
          </Button>
          <div
            onClick={() => {
              setBookingId(params.row.id);
              setDeleteModal(true);
            }}
          >
            <AiOutlineDelete className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loading text="loading appointments" />}
      {bookings && (
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={bookings}
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
      {toggleDetails && (
        <BookingDetails
          bookingDetails={bookingDetails}
          setToggleDetails={setToggleDetails}
        />
      )}
      {deleteModal && (
        <DeleteBooking bookingId={bookingId} setDeleteModal={setDeleteModal} />
      )}
    </>
  );
};

export default RepairsTable;
