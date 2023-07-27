import { days } from "@/constants";
import { Mail, PhoneForwarded } from "lucide-react";
import SmallHeading from "../ui/SmallHeading";
import { buttonVariants } from "../ui/Button";

const BookingSideBar = () => (
  <div className="rounded-lg p-6 bg-white">
    <SmallHeading> Have a question?</SmallHeading>
    <p className="text-sm">Get in touch, we&apos;re always here to help you.</p>
    <div className="mt-2 flex flex-col gap-2">
      <a href={`tel:0123456789`} target="_blank">
        <div className={buttonVariants({ variant: "outline" })}>
          <PhoneForwarded size={20} className="text-dimPurple" strokeWidth={1.75} />
          <p className="pl-2 text-sm">Call Us</p>
        </div>
      </a>
      <a href={`mailto:admin@carclinic.com`} target="_blank">
        <div className={buttonVariants({ variant: "outline" })}>
          <Mail size={20} className="text-dimPurple" strokeWidth={1.75} />
          <p className="pl-2 text-sm">Send Us an Email</p>
        </div>{" "}
      </a>
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

              <p className="absolute right-6 text-xs">{day.activity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default BookingSideBar;
