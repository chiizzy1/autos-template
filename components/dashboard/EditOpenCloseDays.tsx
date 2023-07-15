"use client";

import { FC, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Button, buttonVariants } from "../ui/Button";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";

interface EditOpenCloseDaysProps {}

const EditOpenCloseDays: FC<EditOpenCloseDaysProps> = ({}) => {
  const [day, setDay] = useState<any>();
  const [selected, setSelected] = useState<Date | null>(null);

  // Get cureent status of selected date

  const getDayStatus = async (info: any) => {
    const { data } = await axios.post(`/api/booking/${info}`);
    return data?.selected;
  };

  const {
    mutate: getDayInfo,
    data: dayData,
    isLoading: loadingDay,
  } = useMutation(getDayStatus, {
    onSuccess: (successData) => {
      setDay(successData);
      setSelected(new Date(parseInt(successData.day)));
    },
    onError: (error) => console.log(error),
  });

  // Edit Open / close days
  const editOpenClose = async (info: any) => {
    const { data } = await axios.post(`/api/booking/open/${info}`, {
      currentStatus: day.open,
    });
    return data?.selected;
  };

  const { mutate, error, isLoading, isError, data } = useMutation(
    editOpenClose,
    {
      onSuccess: (successData) => {
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

  return (
    <div>
      <p className="font-medium text-sm mt-4 mb-2">
        Please Select a date to see all available sessions
      </p>
      <div className="flex items-center gap-4 transition-all">
        <ReactDatePicker
          selected={selected}
          dateFormat="dd-MM-yy"
          minDate={new Date()}
          className={`${buttonVariants({
            variant: "purple",
          })}`}
          placeholderText="select date"
          filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
          onChange={(date: Date) => {
            getDayInfo(date.getTime());
          }}
        />

        {loadingDay && (
          <Button variant="purple" isLoading={loadingDay} disabled={loadingDay}>
            loading data
          </Button>
        )}
        {day && (
          <Button
            variant="default"
            className={`${day.open ? "bg-green-500" : "bg-red-500"}`}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => mutate(day.day)}
          >
            {isLoading ? "Editing ..." : `${day.open ? "close" : "open"} day!`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditOpenCloseDays;
