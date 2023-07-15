import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/Button";

interface CarCardsProps {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const CarCards: FC<CarCardsProps> = ({
  setToggleModal,
  setEditModal,
  setDeleteModal,
  data,
}) => {
  const { owner, repair, ...carInfo } = data;
  const { make, model, year, plateNumber, createdAt } = carInfo;
  const { email, firstName, lastName, phone } = owner;

  let activeRepairs: number = 0;
  let pendingPayments: number = 0;
  let total: number = 0;

  repair.map((info: any, i: number) => {
    if (!info.paid) pendingPayments++;
    if (!info.fixed) activeRepairs++;
    total += info.estimatedCost;
    return {
      ...info,
      sn: i + 1,
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Car Details</div>
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
        <p className="text-xs font-medium  mb-1">
          <strong className="pr-2">Manufacturer:</strong> {make}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Model:</strong> {model}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Year:</strong> {year}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Plate Number:</strong> {plateNumber}
        </p>
        <p className="text-xs">
          <strong className="pr-2">Date registered:</strong>
          {new Date(createdAt).toDateString()}
        </p>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Owner Details</div>
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
        <p className="text-xs font-medium  mb-1">
          <strong className="pr-2">Name:</strong> {`${lastName} ${firstName}`}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Email:</strong> {email}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Phone:</strong> {phone}
        </p>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Stats</div>
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
          <strong className="pr-2">Total cost:</strong>{" "}
          {total.toLocaleString("en")}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Pending Payments:</strong> {pendingPayments}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Repairs:</strong> {repair.length}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Completed Repairs:</strong>{" "}
          {repair.length - activeRepairs}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Active Repairs:</strong> {activeRepairs}
        </p>
      </div>

      <div className="bg-white border p-4 rounded-lg flex flex-col gap-2">
        <Button onClick={() => setToggleModal(true)} variant="purple">
          Add new repair details
        </Button>
        <Button onClick={() => setEditModal(true)} variant="purple">
          Edit Car details
        </Button>
        <Button onClick={() => setDeleteModal(true)} variant="purple">
          Delete Car details
        </Button>
      </div>
    </div>
  );
};

export default CarCards;
