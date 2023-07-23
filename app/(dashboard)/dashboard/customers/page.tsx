import GetAllCustomers from "@/components/dashboard/GetAllCustomers";
import Header from "@/components/dashboard/Header";

const page = () => {
  return (
    <main className="min-h-screen">
        <Header page="allCustomer" />
        <GetAllCustomers />
    </main>
  );
};

export default page;