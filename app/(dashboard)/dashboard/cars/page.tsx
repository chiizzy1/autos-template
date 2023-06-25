import FetchAllCars from "@/components/dashboard/FetchAllCars";
import Header from "@/components/dashboard/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <div className="container max-w-7xl mx-auto">
        <Header page="" />
        <h1>See all cars in our database</h1>
        <FetchAllCars />
      </div>
    </div>
  );
};

export default page;
