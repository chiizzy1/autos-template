"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add, format } from "date-fns";

interface SelectDateTimeProps {
  session: DateTime
  setSession: Dispatch<SetStateAction<DateTime>>
}

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

const SelectDateTime: FC<SelectDateTimeProps> = ({session, setSession}) => {
  

  const [select, setSelect] = useState(-1)

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

  console.log(session.dateTime);

  return (
    <div>
      <h4 className="font-medium text-sm mt-8">Please Select a date to see all available sessions</h4>
      <DatePicker
        selected={session.justDate}
        dateFormat="dd-MM-yy"
        minDate={new Date()}
        className="bg-sky-700 text-white my-8 rounded-md w-full h-[5rem] text-center cursor-pointer"
        placeholderText="select date"
        filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
        onChange={(date: Date) => {
          setSession((prevDetails) => ({ ...prevDetails, justDate: date }));
          console.log(date);
        }}
      />

      {times && <h4 className="font-medium text-sm mt-8">All available sessions</h4>}
      <div className="grid grid-cols-tile gap-6 my-8">
        {times?.map((time, i) => (
          <div key={i} onClick={()=>setSelect(i)} className={`${select == i ? 'bg-green-400':'bg-zinc-200'}  border rounded-lg py-2 text-center`}>
            <button
              type="button"
              onClick={() =>
                setSession((prevDetails) => ({
                  ...prevDetails,
                  dateTime: time,
                }))
              }
            >
              {format(time, "kk:mm")}
            </button>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDateTime;