"use client";

import { FC, useState } from "react";
import BookingForm from "./BookingForm";
import SelectDateTime from "./SelectDateTime";
import { toast } from "../ui/toast";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

interface BookingStateProps {}

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const BookingState: FC<BookingStateProps> = ({}) => {
  const [dayId, setDayId] = useState<string>()
  const [session, setSession] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: async (info: any) => {
      console.log(info);
      const { data } = await axios.post("/api/booking/new", info);
      return data.booking;
    },
    onSuccess: (successData) => {
      console.log(successData);
      toast({
        title: "success creating new repair",
        message: "okay",
        type: "success",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error creating new repair",
          message: `${error?.response?.data.error} ⚠️`,
          type: "error",
        });
      }

      console.log(error);
    },
  });

  const handleBookingSubmit = (formData: any) => {
    console.log('dayId:', dayId)
    mutate({
      ...formData,
      dayId,
      date: session.justDate?.getTime(),
      time: session.dateTime?.getTime(),
    });
  };

  return (
    <div>
      <h4 className="font-medium text-lg">Select Appointment Date and Time</h4>
      <SelectDateTime session={session} setSession={setSession} setDayId={setDayId} />

      <h4 className="font-medium text-lg my-8">Booking Details</h4>
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default BookingState;