"use client";

import Link from "next/link";
import { FC, useState } from "react";
import CarsTable from "./CarsTable";
import CustomerCard from "./CustomerCard";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomerInfo from "./EditCustomerInfo";
import RepairsTable from "./RepairsTable";
import StatsCard from "./StatsCard";

interface CustomerProps {
  data: any;
  customerId: string;
}

const Customer: FC<CustomerProps> = ({ data, customerId }) => {
  const [customerEditModal, setCustomerEditModal] = useState(false);
  const [customerDeleteModal, setCustomerDeleteModal] = useState(false);

  const { cars, repairs }: any = data;


  // add SN to Cars array
  let customerCars: [] = [];

  if (cars) {
    customerCars = cars.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  // add SN to repairs array
  let repairsData: [] = [];

  if (repairs) {
    repairsData = repairs.map((info: any, i: number) => {
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  return (
    <div>
      Customer bruhjk
      <div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
        <CustomerCard />
        <StatsCard />
        <div className="bg-white shadow-lg border p-4 rounded-lg flex flex-col gap-2">
          <div
            onClick={() => setCustomerDeleteModal(true)}
            className="bg-red-400 p-6 rounded cursor-pointer"
          >
            Delete Customer Data
          </div>
          <div
            onClick={() => setCustomerEditModal(true)}
            className="bg-sky-400 p-6 rounded cursor-pointer"
          >
            Edit Customer Info
          </div>
          <div className="bg-green-400 p-6 rounded cursor-pointer">
            <Link href={`dashboard/customers/${customerId}/cars/newcar`}>
              Add New Car
            </Link>
          </div>
          {/* <Link href={`dashbaord/customers/${customerId}/cars`}>View all cars</Link> */}
        </div>
      </div>
      <div className="pt-8">
        <h3 className="text-xl font-medium pb-4 sm: text-center">
          {data && data.firstName} Transaction History
        </h3>
      </div>
      <h3 className="text-bold text-xl text-black py-6 text-center">
        All Customer Cars
      </h3>
      {customerCars && (
        <CarsTable cars={customerCars} customerId={customerId} />
      )}
      <h3 className="text-bold text-xl text-black py-6 text-center">
        Customer Repair History
      </h3>
      {repairsData && (
        <RepairsTable repairs={repairsData} customerId={customerId} />
      )}
      {customerEditModal && (
        <EditCustomerInfo
          customerId={customerId}
          setCustomerEditModal={setCustomerEditModal}
        />
      )}
      {customerDeleteModal && (
        <DeleteCustomer
          customerId={customerId}
          setCustomerDeleteModal={setCustomerDeleteModal}
        />
      )}
    </div>
  );
};

export default Customer;