"use client";

import { FC, useState } from "react";
import BookingForm from "./BookingForm";
import SelectDateTime from "./SelectDateTime";
import { toast } from "../ui/toast";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import SmallHeading from "../ui/SmallHeading";
import { useRouter } from "next/navigation";

interface BookingStateProps {}

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const BookingState: FC<BookingStateProps> = ({}) => {
  const [dayId, setDayId] = useState<string>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [session, setSession] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const { push } = useRouter();

  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: async (info: any) => {
      const { data } = await axios.post("/api/booking/new", info);
      return data.booking;
    },
    onSuccess: (successData) => {
      console.log(successData);
      toast({
        title: "Great!!",
        message: "Successfully booked appointment",
        duration: 5000,
        type: "success",
      });
      push("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Error!!",
          message: `${error?.response?.data.error} ⚠️`,
          duration: 5000,
          type: "error",
        });
      }
    },
  });

  const handleBookingSubmit = (formData: any) => {
    mutate({
      ...formData,
      dayId,
      date: session.justDate?.getTime(),
      time: session.dateTime?.getTime(),
    });
  };

  return (
    <div>
      <SmallHeading>Select Appointment Date and Time</SmallHeading>
      <SelectDateTime
        session={session}
        setSession={setSession}
        setDayId={setDayId}
        setToggle={setToggle}
      />

      {toggle && (
        <>
          <SmallHeading className="pt-8 pb-4">Appointment Details</SmallHeading>
          <BookingForm onSubmit={handleBookingSubmit} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default BookingState;
