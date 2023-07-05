import BookingTable from "@/components/dashboard/BookingTable";
import EditOpenCloseDays from "@/components/dashboard/EditOpenCloseDays";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await db.appointmentClient.findMany({
    include: { selectedSession: true },
  });

  return (
    <div>
      <h3 className="py-4">Edit Opening/Closing dates!!</h3>

    <EditOpenCloseDays />

      <h3 className="pt-10">See all appointments!!</h3>
      {data && <BookingTable data={data} />}
    </div>
  );
};

export default page;
