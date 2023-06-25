"use client";

import Header from "@/components/dashboard/Header";
import Test from "@/components/dashboard/Test";
import { getCustomer } from "@/helpers/customers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const Customer = async ({ params }: any) => {
//   const { customerId } = params

//   return (
//     <div className="p-4">
//       <Header name='izzy' />
//       <div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
//         <CustomerCard />
//         <StatsCard />
//       </div>
//       <div className="pt-8">
//         <h3 className="text-xl font-medium pb-4 sm: text-center">{customerId} Transaction History</h3>
//         <CustomerTransactionHistory customerId={customerId} />
//       </div>
//     </div>
//   );
// };

// export default Customer;

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
  const { data, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => fetchDetails(url.params.customerId),
  });
  if (isLoading) return "Loading";
  // console.log(data)
  return (
    <div>
      <Header page="" />
      <Test data={data} customerId={url.params.customerId} />
    </div>
  );
}
