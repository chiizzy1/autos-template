import { CalendarClock, Wrench } from "lucide-react";
import { FC } from "react";
import { AiOutlineCar, AiOutlineWallet } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";

interface TopCardsProps {
  customers: any;
  cars: any;
  repairs: any;
  booking: any;
}

const TopCards: FC<TopCardsProps> = ({ customers, cars, repairs, booking }) => {
  let init = 0;
  repairs.map((obj: any) => (init += obj.estimatedCost));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">Total Revenue</div>
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
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div>
          <div className="text-2xl font-bold">{init.toLocaleString("en")}</div>
          <p className="text-xs text-muted-foreground">
            +200.1% from last month
          </p>
        </div>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">
            {" "}
            {`Customer${customers.length > 1 ? "s" : ""}`}
          </div>
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
        <div>
          <div className="text-2xl font-bold">{booking.length}</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </div>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">{`Pending Appointment${
            booking.length > 1 ? "s" : ""
          }`}</div>
          <CalendarClock size={16} strokeWidth={1} />
        </div>
        <div>
          <div className="text-2xl font-bold">{cars.length}</div>
          <p className="text-xs text-muted-foreground">
            +3520.1% from last month
          </p>
        </div>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">{`Repair${
            repairs.length > 1 ? "s" : ""
          }`}</div>

          <Wrench size={16} strokeWidth={1} />
        </div>
        <div>
          <div className="text-2xl font-bold">{repairs.length}</div>
          <p className="text-xs text-muted-foreground">
            +2000.1% from last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
