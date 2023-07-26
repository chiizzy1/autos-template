"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Mail, PhoneForwarded } from "lucide-react";
import ActionButtons from "../ui/ActionButtons";

interface BookingDetailsProps {
  setToggleDetails: Dispatch<SetStateAction<boolean>>;
  bookingDetails: [] | null;
}

const BookingDetails: FC<BookingDetailsProps> = ({
  setToggleDetails,
  bookingDetails,
}) => {
  const { booked, email, make, name, model, year, phone, reason, time }: any =
    bookingDetails;

  console.log(bookingDetails);

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md"
            onClick={() => {
              setToggleDetails(false);
            }}
          >
            <AiOutlineClose className="text-2xl  text-red-500 font-black cursor-pointer" />
          </div>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-bold text-dimPurple">
              {" "}
              Customer Details
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="border w-full mb-2" />
          <p className="text-xs mb-1">
            <strong className="pr-2">Name:</strong> {name}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Email:</strong> {email}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Phone:</strong> {phone}
          </p>

          <div className="border w-full mb-2" />
          <p className="text-sm font-bold text-dimPurple">Car Details </p>
          <div className="border w-full mb-2" />

          <p className="text-xs mb-1">
            <strong className="pr-2">Car Nake:</strong> {make}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Car Model:</strong> {model}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Year Manufactured:</strong> {year}
          </p>

          <div className="border w-full mb-2" />
          <p className="text-sm font-bold text-dimPurple">
            Appointment Details{" "}
          </p>
          <div className="border w-full mb-2" />

          <p className="text-xs mb-1">
            <strong className="pr-2">Reason:</strong> {reason}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Selected Session:</strong> {time}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Date Booked:</strong>{" "}
            {new Date(booked).toLocaleString()}
          </p>

          <div className="border w-full mb-2" />
          <p className="text-sm font-bold text-dimPurple">Actions</p>

          <div className="border w-full mb-2" />

          <ActionButtons email={email} phone={phone} />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
