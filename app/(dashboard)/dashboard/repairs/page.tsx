import FetchAllRepairs from "@/components/dashboard/FetchAllRepairs";
import Header from "@/components/dashboard/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container max-w-7xl mx-auto">
        <Header name="izzy" id="id" />
        <div className="scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          <h3 className="font-medium text-xl">Latest repairs</h3>

          <FetchAllRepairs />
        </div>
      </div>
    </div>
  );
};

export default page;