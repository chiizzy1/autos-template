import React from "react";
import { FC } from "react";
import { formatTimeToNow } from "@/lib/utils";
import { BiDollar } from "react-icons/bi";

interface RecentOrdersProps {
  repairs: any;
}

const RecentOrders: FC<RecentOrdersProps> = ({ repairs }) => {
  return (
    <div className="w-full scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100  col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll">
      <h1>Recent Payments</h1>
      <ul>
        {repairs.map((obj: any) =>
          obj.paid ? (
            <li
              key={obj.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div className="bg-purple-100 rounded-lg p-3">
                <BiDollar className="text-purple-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">
                  ${obj.estimatedCost.toLocaleString("en")}
                </p>
                <p className="text-gray-400 text-sm">{`${obj.owner.firstName} ${obj.owner.lastName}`}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {formatTimeToNow(new Date(obj.startDate))}
              </p>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default RecentOrders;
