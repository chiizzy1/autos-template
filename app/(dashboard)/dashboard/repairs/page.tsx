import FetchAllRepairs from "@/components/dashboard/FetchAllRepairs";
import Header from "@/components/dashboard/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="min-h-screen">
      <Header page="" />
      <FetchAllRepairs />
    </main>
  );
};

export default page;
