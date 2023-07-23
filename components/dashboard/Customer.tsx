"use client";

import { FC, useState } from "react";
import CarsTable from "./CarsTable";
import CustomerCard from "./CustomerCard";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomerInfo from "./EditCustomerInfo";
import RepairsTable from "./RepairsTable";
import NewCarModal from "./NewCarModal";
import SmallHeading from "../ui/SmallHeading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/Loading";

interface CustomerProps {
  customerId: string;
}

const fetchDetails = async (customerId: string) => {
  const { data } = await axios.get(`/api/customers/${customerId}`);
  return data.customerData;
};

const Customer: FC<CustomerProps> = ({ customerId }) => {
  const [customerEditModal, setCustomerEditModal] = useState(false);
  const [customerDeleteModal, setCustomerDeleteModal] = useState(false);
  const [newCarModal, setNewCarModal] = useState(false);

  
  const { data, isError, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => fetchDetails(customerId),
  });

  if (isError) {
    return (
      <h4 className="text-red-500 font-bold text-2xl">Error Loading page!</h4>
    );
  }

  
  return (
    <>
    {isLoading && <Loading text="Loading Customer Data" /> }
      {data && (
        <>
          <SmallHeading className="pl-4 py-4">
            {`${data?.lastName} ${data?.firstName}`} Transactions Page
          </SmallHeading>
          <CustomerCard
            customerInfo={data}
            setCustomerDeleteModal={setCustomerDeleteModal}
            setCustomerEditModal={setCustomerEditModal}
            setNewCarModal={setNewCarModal}
          />{" "}
        </>
      )}
      <div className="p-4">
        {data && (
          <>
            <div className="flex">
              <SmallHeading className="py-4">
                All {`${data?.lastName} ${data?.firstName}`} Cars
              </SmallHeading>
            </div>
            <CarsTable customerId={customerId} />
          </>
        )}

        {data && (
          <>
            <SmallHeading className="py-4">
              All {`${data?.lastName} ${data?.firstName}`} Repairs
            </SmallHeading>
            <RepairsTable customerId={customerId} />
          </>
        )}
        {customerEditModal && (
          <EditCustomerInfo
            customerId={customerId}
            setCustomerEditModal={setCustomerEditModal}
            customerData = {data}
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
