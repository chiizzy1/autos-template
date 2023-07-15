"use client";

import { FC, useState } from "react";
import CarsTable from "./CarsTable";
import CustomerCard from "./CustomerCard";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomerInfo from "./EditCustomerInfo";
import RepairsTable from "./RepairsTable";
import NewCarModal from "./NewCarModal";
import SmallHeading from "../ui/SmallHeading";

interface CustomerProps {
  data: any;
  customerId: string;
}

const Customer: FC<CustomerProps> = ({ data, customerId }) => {
  const [customerEditModal, setCustomerEditModal] = useState(false);
  const [customerDeleteModal, setCustomerDeleteModal] = useState(false);
  const [newCarModal, setNewCarModal] = useState(false);

  const { cars, repairs, ...customerInfo }: any = data;

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
  let activeRepairs: number = 0;
  let pendingPayments: number = 0;
  let total: number = 0;

  if (repairs) {
    repairsData = repairs.map((info: any, i: number) => {
      if (!info.paid) pendingPayments++;
      if (!info.fixed) activeRepairs++;
      total += info.estimatedCost;
      return {
        ...info,
        sn: i + 1,
      };
    });
  }

  return (
    <>
      <SmallHeading className="pl-4 py-4">
        {`${data.lastName} ${data.firstName}`} Transactions Page
      </SmallHeading>
      <CustomerCard
        customerInfo={customerInfo}
        cars={cars}
        repairs={repairs}
        setCustomerDeleteModal={setCustomerDeleteModal}
        setCustomerEditModal={setCustomerEditModal}
        setNewCarModal={setNewCarModal}
        activeRepairs={activeRepairs}
        pendingPayments={pendingPayments}
        total={total}
      />
      <div className="p-4">
        {customerCars && (
          <>
            <div className="flex">
              <SmallHeading className="py-4">
                All {`${data.lastName} ${data.firstName}`} Cars
              </SmallHeading>
            </div>
            <CarsTable customerId={customerId} />
          </>
        )}

        {repairsData && (
          <>
            <SmallHeading className="py-4">
              All {`${data.lastName} ${data.firstName}`} Repairs
            </SmallHeading>
            <RepairsTable customerId={customerId} />
          </>
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
            page="customer"
          />
        )}
        {newCarModal && (
          <NewCarModal
            customerId={customerId}
            setNewCarModal={setNewCarModal}
          />
        )}
      </div>
    </>
  );
};

export default Customer;
