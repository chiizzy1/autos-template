"use client";

import { FC } from "react";
import TrackTable from "./TrackTable";
import TrackUi from "./TrackUi";
import Image from "next/image";
import { customerCare } from "@/assets";
import SmallHeading from "../ui/SmallHeading";

interface TrackDetailsProps {
  data: any;
}

const TrackDetails: FC<TrackDetailsProps> = ({ data }) => {
  return (
    <div>
      <SmallHeading className="mb-4">Car Details</SmallHeading>
      <TrackTable trackData={data} />
      <div className="flex gap-8 lg:flex-row flex-col sm:py-9 py-6">
        <div className="w-full rounded-md bg-green-50 p-6">
          <SmallHeading>Car Repair Status</SmallHeading>
          <TrackUi status={data.repairStatus} />
        </div>

        <div className="w-full bg-sky-50 border rounded-md p-6">
          <SmallHeading>Not Satisfied?</SmallHeading>
          <div className="flex items-center justify-center sm:py-9 py-6">
            <div className="rounded-full overflow-hidden">
              <Image
                src={customerCare}
                alt="customer care"
                width={100}
                height={100}
              />
            </div>
            <p className="text-[.8rem] ml-8">
              Have any Complaints!
              <br /> Our agents are always online 24/7 to attent to you.
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TrackDetails;
