"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Activity, Mail, PhoneForwarded, Wrench } from "lucide-react";
import { buttonVariants } from "../ui/Button";
import ActionButtons from "../ui/ActionButtons";

interface RepairDetailsProps {
  setViewRepair: Dispatch<SetStateAction<boolean>>;
  repairDetails: any;
}

const RepairDetails: FC<RepairDetailsProps> = ({
  setViewRepair,
  repairDetails,
}) => {
  const {
    delivered,
    deliveryDate,
    description,
    estimatedCost,
    finishDate,
    fixed,
    repairStatus,
    paid,
    startDate,
    trackId,
    owner,
  } = repairDetails;

  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex">
          <div
            className="p-1 border border-red-500 rounded-md"
            onClick={() => {
              setViewRepair(false);
            }}
          >
            <AiOutlineClose className="text-2xl  text-red-500 font-black cursor-pointer" />
          </div>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-bold text-dimPurple"> Owner Details</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="border w-full mb-2" />
          <p className="text-xs mb-1">
            <strong className="pr-2">Name:</strong>{" "}
            {`${owner.lastName} ${owner.firstName}`}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Email:</strong> {owner.email}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Phone:</strong> {owner.phone}
          </p>

          <div className="border w-full mb-2" />
          <p className="text-sm font-bold text-dimPurple"> Repair Details</p>
          <div className="border w-full mb-2" />

          <p className="text-xs mb-1">
            <strong className="pr-2">Repair Cost:</strong> {estimatedCost}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Track ID:</strong> {trackId}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Repair Status:</strong> {repairStatus}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Fixed:</strong> {fixed ? "Yes" : "No"}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Paid:</strong> {paid ? "Yes" : "No"}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Phone:</strong> {owner.phone}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Delivered:</strong>{" "}
            {delivered ? "Yes" : "No"}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Diagnosis:</strong> {description}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Start Date:</strong>{" "}
            {new Date(startDate).toDateString()}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Finished Date:</strong>{" "}
            {finishDate ? new Date(finishDate).toDateString() : "null"}
          </p>
          <p className="text-xs mb-1">
            <strong className="pr-2">Date Delivered:</strong>{" "}
            {delivered ? new Date(deliveryDate).toDateString() : "null"}
          </p>

          <div className="border w-full mb-2" />
          <p className="text-sm font-bold text-dimPurple"> Actions</p>
          <div className="border w-full mb-2" />

          <ActionButtons email={owner.email} phone={owner.phone} />
        </div>
      </div>
    </div>
  );
};

export default RepairDetails;
