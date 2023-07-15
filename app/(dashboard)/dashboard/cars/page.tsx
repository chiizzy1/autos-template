import FetchAllCars from "@/components/dashboard/FetchAllCars";
import Header from "@/components/dashboard/Header";
import SmallHeading from "@/components/ui/SmallHeading";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="min-h-screen">
      <Header page="" />
      <div className="p-4">
        <SmallHeading className="py-4">See all cars in our database</SmallHeading>
        <FetchAllCars />
      </div>
    </main>
  );
};

export default page;
