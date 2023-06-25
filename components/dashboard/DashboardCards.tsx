"use client";

import { FC } from "react";
import BarChart from "./BarChart";
import RecentOrders from "./RecentOrders";
import TopCards from "./TopCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../ui/Loading";

interface DashboardCardsProps {}

const DashboardCards: FC<DashboardCardsProps> = ({}) => {
  let customersData: any | null = null;
  let carsData: any | null = null;
  let repairsData: any | null = null;

  const getAllCars = async () => {
    const customers = await axios.get("/api/customers/getAllCustomers");
    customersData = customers.data.customerData;

    const cars = await axios.get("/api/cars/getAllCars");
    carsData = cars.data.CarData;

    const repairs = await axios.get("/api/repairs/getAllRepairs");
    repairsData = repairs.data.RepairData;

    if (customersData && carsData && repairsData) {
      return { customersData, carsData, repairsData };
    }
  };

  const { data, error, isError, isLoading } = useQuery(
    ["dashboard"],
    getAllCars
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div>
      {data && (
        <>
          <TopCards
            customers={data?.customersData}
            cars={data?.carsData}
            repairs={data?.repairsData}
          />
          <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
            <BarChart />
            <RecentOrders repairs={data?.repairsData} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCards;