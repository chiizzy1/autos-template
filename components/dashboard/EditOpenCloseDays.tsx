"use client";

import { FC, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Button } from "../ui/Button";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";

interface EditOpenCloseDaysProps {}

const EditOpenCloseDays: FC<EditOpenCloseDaysProps> = ({}) => {
  const [day, setDay] = useState<any>();

  // Get cureent status of selected date

  const getDayStatus = async (info: any) => {
    const { data } = await axios.post(`/api/booking/${info}`);
    return data?.selected;
  };

  const { mutate: getDayInfo, data: dayData } = useMutation(getDayStatus, {
    onSuccess: (successData) => {
      console.log(successData);
      setDay(successData);
    },
    onError: (error) => console.log(error),
  });

  // Edit Open / close days
  const editOpenClose = async (info: any) => {
    console.log('dayData:', info)
    const { data } = await axios.post(`/api/booking/open/${info}`, {
      currentStatus: day.open,
    });
    return data?.selected;
  };

  const { mutate, error, isLoading, isError, data } = useMutation(
    editOpenClose,
    {
      onSuccess: (successData) => {
        console.log(successData);

        toast({
          title: "successfully edited day!!",
          message: "okay",
          type: "success",
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error creating new customer",
            message: `${error?.response?.data.error} ⚠️`,
            type: "error",
          });
        }
      },
    }
  );

  console.log(day);
  return (
    <div>
      <h4 className="font-medium text-sm mt-8">
        Please Select a date to see all available sessions
      </h4>
      <ReactDatePicker
        // selected={new Date(parseInt(day.day)).toLocaleString()}
        dateFormat="dd-MM-yy"
        minDate={new Date()}
        className="bg-sky-700 text-white my-8 rounded-md w-full h-[5rem] text-center cursor-pointer"
        placeholderText="select date"
        filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
        onChange={(date: Date) => {
          console.log(typeof date.getTime());
          console.log(date.getTime());
          getDayInfo(date.getTime());
        }}
      />

      {day && (
        <Button
          variant="default"
          className="items-center"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => mutate(day.day)}
        >
          {isLoading ? "Editing ..." : `${day.open ? "close" : "open"} day!`}
        </Button>
      )}
    </div>
  );
};

export default EditOpenCloseDays;
