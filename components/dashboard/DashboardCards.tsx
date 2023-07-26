import { FC } from "react";
import BarChart from "./BarChart";
import RecentPayments from "./RecentPayments";
import TopCards from "./TopCards";
import { db } from "@/lib/db";

interface DashboardCardsProps {}

const DashboardCards: FC<DashboardCardsProps> = async ({}) => {
  const customersData = await db.customer.findMany({
    include: {
      cars: true,
      repairs: true,
    },
  });
  const carsData = await db.carDetails.findMany({
    include: {
      owner: true,
      repair: true,
    },
  });
  const repairsData = await db.repair.findMany({
    include: {
      car: true,
      owner: true,
    },
  });
  const appointmentsData = await db.appointmentClient.findMany({
    include: {
      selectedSession: true,
    },
  });

  return (
    <div>
      <TopCards
        customers={customersData}
        cars={carsData}
        repairs={repairsData}
      />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4 transition-all ease-in-out">
        <BarChart chartData={repairsData} />
        <RecentPayments repairs={repairsData} />
      </div>
    </div>
  );
};

export default DashboardCards;
