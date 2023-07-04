"use client";

import Header from "@/components/dashboard/Header";
import Loading from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Customer from "@/components/dashboard/Customer";


type URL = {
  params: {
    customerId: string;
  };
  searchParams: string;
};
//Fetch All posts
const fetchDetails = async (customerId: string) => {
  const { data } = await axios.get(`/api/customers/${customerId}`);
  return data.customerData;
};

export default function CustomerDetail(url: URL) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => fetchDetails(url.params.customerId),
  });
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <h4 className="text-red-500 font-bold text-2xl">Error Loading page!</h4>
    );
  }
  return (
    <div>
      <Header page="" />
      {data && <Customer data={data} customerId={url.params.customerId} />}
    </div>
  );
}
