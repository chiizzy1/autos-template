import BookingTable from "@/components/dashboard/BookingTable";
import Header from "@/components/dashboard/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  return (
    <main className="min-h-screen">
      <Header page="" />
      <BookingTable />
    </main>
  );
};

export default page;
