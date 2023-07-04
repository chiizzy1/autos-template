"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add, format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/toast";

interface SelectDateTimeProps {
  session: DateTime;
  setSession: Dispatch<SetStateAction<DateTime>>;
  setDayId: Dispatch<SetStateAction<string | undefined>>
}

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

const SelectDateTime: FC<SelectDateTimeProps> = ({ session, setSession, setDayId }) => {
  const [select, setSelect] = useState(-1);

  const getTimes = () => {
    if (!session.justDate) return;

    const { justDate } = session;

    const beginning = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 17 });
    const interval = 30; //in minutes

    const times = [];

    for (let i = beginning; i < end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  console.log(session.dateTime?.getTime());

  const sessionData = async (info: any) => {
    const { data } = await axios.post(`/api/booking/${info}`);
    return data?.selected;
  };

  const { mutate, error, isLoading, isError, data } = useMutation(sessionData, {
    onSuccess: (successData) => {
      console.log(successData);

      toast({
        title: "success creating new car",
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
  });

  let allSelectedSessions:  Map<any, any> = new Map();

  if (data) {
    setDayId(data.id);
    const s = data.selectedSesions;
    for (let i = 0; i < s.length; i++) {
      let selected = s[i].time;
      allSelectedSessions.set(
        selected,
        (allSelectedSessions.get(selected) || 0) + 1
      );
    }
  }
  //  console.log(allSelectedSessions)
  return (
    <div>
      <h4 className="font-medium text-sm mt-8">
        Please Select a date to see all available sessions
      </h4>
      <DatePicker
        selected={session.justDate}
        dateFormat="dd-MM-yy"
        minDate={new Date()}
        className="bg-sky-700 text-white my-8 rounded-md w-full h-[5rem] text-center cursor-pointer"
        placeholderText="select date"
        filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
        onChange={(date: Date) => {
          setSession((prevDetails) => ({ ...prevDetails, justDate: date }));
          console.log(typeof date.getTime());
          console.log(date.getTime());
          mutate(date.getTime());
        }}
      />

      {data && (
        <h4 className="font-medium text-sm mt-8">All available sessions</h4>
      )}
      <div className="grid grid-cols-tile gap-6 my-8">
        {times?.map((time, i) =>
          allSelectedSessions.has(`${time.getTime()}`) ? (
            <div key={i} className="bg-red-400">
              {format(time, "kk:mm")}
            </div>
          ) : (
            <div
              key={i}
              onClick={() => {
                setSelect(i);
                setSession((prevDetails) => ({
                  ...prevDetails,
                  dateTime: time,
                }));
              }}
              className={`${
                select == i ? "bg-green-400" : "bg-zinc-200"
              }  border rounded-lg py-2 text-center`}
            >
              {format(time, "kk:mm")}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SelectDateTime;
