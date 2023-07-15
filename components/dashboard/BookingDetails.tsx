"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Mail, PhoneForwarded } from "lucide-react";

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

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-sky-500 rounded-md"
            onClick={() => {
              setToggleDetails(false);
            }}
          >
            <AiOutlineClose className="text-4xl  text-sky-500 font-black cursor-pointer" />
          </div>
        </div>

        <div className="">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
              <p className="pb-2">Name</p>
              <Input className="bg-slate-100" readOnly value={name} />
            </div>
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Phone</p>
              <Input className="bg-slate-100 " readOnly value={phone} />
            </div>
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Email</p>
              <Input className="bg-slate-100 " readOnly value={email} />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/3 px-3 mb-6 md:mb-0">
              <p className="pb-2">Vehicle Make</p>
              <Input className="bg-slate-100" readOnly value={make} />
            </div>

            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Car Model</p>
              <Input className="bg-slate-100" readOnly value={model} />
            </div>
            <div className="w-full sm:w-1/3 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Year</p>
              <Input className="bg-slate-100" readOnly value={year} />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0">
              <p className="pb-2">Selected Session</p>
              <Input className="bg-slate-100" readOnly value={time} />
            </div>
            <div className="w-full sm:w-1/2 px-3 mb-6 sm:mb-0">
              <p className="pb-2">Date Booked</p>
              <Input
                className="bg-slate-100"
                readOnly
                value={new Date(booked).toLocaleString()}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 sm:mb-0">
              <p className="pb-2">Reason for Appointment</p>
              <Textarea className="bg-slate-100" readOnly value={reason} />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <a href={`tel:${phone}`} target="_blank">
              <div className="flex items-center rounded-lg bg-sky-500 p-2">
                <PhoneForwarded className="text-dimPurple" />
                <p className="pl-2">Call Customer </p>
              </div>
            </a>

            <a href={`mailto:${email}`} target="_blank">
              <div className="flex items-center rounded-lg bg-sky-500 p-2">
                <Mail className="text-dimPurple" />
                <p className="pl-2">Send Customer Email</p>
              </div>{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
