import BookingTable from "@/components/dashboard/BookingTable";
import EditOpenCloseDays from "@/components/dashboard/EditOpenCloseDays";
import Header from "@/components/dashboard/Header";
import SmallHeading from "@/components/ui/SmallHeading";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await db.appointmentClient.findMany({
    include: { selectedSession: true },
  });

  return (
    <main>
      <Header page="" />
      <div className="p-4">
        <SmallHeading className="py-4">Edit Opening/Closing dates!</SmallHeading>

        <EditOpenCloseDays />

        <SmallHeading className="pb-4 pt-8">See all appointments!!</SmallHeading>
        {data && <BookingTable data={data} />}
      </div>
    </main>
  );
};

export default page;
