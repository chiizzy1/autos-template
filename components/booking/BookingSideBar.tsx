import { days } from "@/constants";
import { BsTelephoneFill } from "react-icons/bs";
import SmallHeading from "../ui/SmallHeading";

const BookingSideBar = () => (
  <div className="rounded-lg p-6 bg-white">
    <SmallHeading> Have a question?</SmallHeading>
    <p>Give us a call, we&apos;re here to help you.</p>
    <div className="flex items-center ">
      <BsTelephoneFill /> <span className="ml-2">012-345-678-9</span>
    </div>
    <hr className="my-8" />

    <SmallHeading>Our Location?</SmallHeading>
    <p className="text-sm">plot 4-6, lekki ikate, lagos state, Nigeria</p>

    <hr className="my-8" />

    

    <div className="w-full relative m-auto p-4 border rounded-lg">
      
      <SmallHeading> Opening Hours</SmallHeading>
      <ul>
        {days.map((day: any) => (
          <li
            key={day.day}
            className="bg-gray-100 rounded-lg my-3 p-2 flex items-center"
          >
            <div className="flex items-center">
              <p className="text-dimPurple text-sm font-semibold">{day.day}</p>

              <p className="absolute right-6 text-xs">
                {day.activity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default BookingSideBar;
