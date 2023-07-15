import { FC } from "react";
import Link from "next/link";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { GiAutoRepair } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import SignOutButton from "../ui/SignOutButton";
import { AiOutlineCar } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";

interface SideBarProps {
  children: React.ReactNode;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/dashboard">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href="/dashboard/customers">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href="/dashboard/cars">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <AiOutlineCar size={20} />
            </div>
          </Link>
          <Link href="/dashboard/repairs">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <GiAutoRepair size={20} />
            </div>
          </Link>
          <Link href="/dashboard/bookings">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <BsCalendarEvent size={20} />
            </div>
          </Link>
          <Link href="/dashboard/upload-img">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
              <FiUpload size={20} />
            </div>
          </Link>

          <SignOutButton page="dashboard" />
        </div>
      </div>
      <main className="ml-12 w-full">{children}</main>
    </div>
  );
};

export default SideBar;
