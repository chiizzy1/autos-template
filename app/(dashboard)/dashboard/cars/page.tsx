import FetchAllCars from "@/components/dashboard/FetchAllCars";
import Header from "@/components/dashboard/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="min-h-screen">
      <Header page="" />
      <FetchAllCars />
    </main>
  );
};

export default page;
