import GetAllCustomers from "@/components/dashboard/GetAllCustomers";
import Header from "@/components/dashboard/Header";

const page = async () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container max-w-7xl mx-auto">
        <Header page="" />
        <GetAllCustomers />
      </div>
    </div>
  );
};

export default page;
