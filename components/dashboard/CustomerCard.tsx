import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/Button";
import { ArrowLeftRight, Wallet } from "lucide-react";

interface CustomerCardProps {
  customerInfo: any;
  setCustomerEditModal: Dispatch<SetStateAction<boolean>>;
  setCustomerDeleteModal: Dispatch<SetStateAction<boolean>>;
  setNewCarModal: Dispatch<SetStateAction<boolean>>;
}

const CustomerCard: FC<CustomerCardProps> = ({
  customerInfo,
  setCustomerDeleteModal,
  setCustomerEditModal,
  setNewCarModal,
}) => {
  const { lastName, firstName, email, phone, createdAt, cars, repairs } =
    customerInfo;

  let activeRepairs: number = 0;
  let pendingPayments: number = 0;
  let total: number = 0;
  let outstanding: number = 0;

  repairs.map((info: any, i: number) => {
    if (!info.paid) {
      pendingPayments++;
      outstanding += info.estimatedCost;
    }
    if (!info.fixed) activeRepairs++;
    total += info.estimatedCost;
    return {
      ...info,
      sn: i + 1,
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 transition-all ease-in-out">
      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Customer Details</div>
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
        <p className="text-xs">
          <strong className="pr-2">Date registered:</strong>{" "}
          {new Date(createdAt).toDateString()}
        </p>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Stats</div>
          <ArrowLeftRight size={20} strokeWidth={1.25} />
        </div>
        <div className="border w-full mb-2" />
        <p className="text-xs mb-1">
          <strong className="pr-2">Cars:</strong> {cars.length}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Repairs:</strong> {repairs.length}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Active Repairs:</strong> {activeRepairs}
        </p>
        <p className="text-xs">
          <strong className="pr-2">Completed Repairs:</strong>
          {repairs.length - activeRepairs}
        </p>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Transactions</div>
          <Wallet size={20} strokeWidth={1.25} />
        </div>
        <div className="border w-full mb-2" />
        <p className="text-xs font-medium  mb-1">
          <strong className="pr-2">Total Repair Costs:</strong> $
          {total.toLocaleString("en")}
        </p>
        <p className="text-xs mb-1">
          <strong className="pr-2">Total payment:</strong> $
          {(total - outstanding).toLocaleString("en")}
        </p>
        <p className="text-xs">
          <strong className="pr-2">Pending Payment:</strong> $
          {outstanding.toLocaleString("en")}
        </p>
      </div>

      <div className="bg-white border p-6 rounded-lg flex flex-col gap-2">
        <Button variant="purple" onClick={() => setCustomerDeleteModal(true)}>
          Delete Customer Data
        </Button>
        <Button variant="purple" onClick={() => setCustomerEditModal(true)}>
          Edit Customer Info
        </Button>

        <Button variant="purple" onClick={() => setNewCarModal(true)}>
          Add New Car
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
