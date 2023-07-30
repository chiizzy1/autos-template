"use client";

import { FC } from "react";
import TrackTable from "./TrackTable";
import TrackUi from "./TrackUi";
import Image from "next/image";
import { customerCare } from "@/assets";
import SmallHeading from "../ui/SmallHeading";
import { Mail, PhoneForwarded } from "lucide-react";
import { buttonVariants } from "../ui/Button";

interface TrackDetailsProps {
  data: any;
}

const TrackDetails: FC<TrackDetailsProps> = ({ data }) => {
  return (
    <div className="border p-4 rounded-lg">
      <SmallHeading className="mb-4 mt-10">Tracking Details</SmallHeading>
      <TrackTable trackData={data} />
      <div className="flex gap-8 lg:flex-row flex-col sm:py-9 py-6 pt-10">
        <div className="w-full rounded-md bg-stone-300 p-6">
          <SmallHeading className="text-center">Car Repair Status</SmallHeading>
          <TrackUi status={data.repairStatus} />
        </div>

        <div className="w-full bg-stone-300 border rounded-md p-6">
          <SmallHeading className="text-center">Not Satisfied?</SmallHeading>
          <div className="flex items-center justify-center gap-6 sm:py-9 py-6">
            <div className="rounded-full overflow-hidden">
              <Image
                src={customerCare}
                alt="customer care"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs">
                Have any Complaints!
                <br /> Our agents are always online 24/7 to attent to you.
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <a href={`tel:0123456789`} target="_blank">
                  <div className={buttonVariants({ variant: "outline" })}>
                    <PhoneForwarded
                      size={20}
                      className="text-dimPurple"
                      strokeWidth={1.75}
                    />
                    <p className="pl-2 text-sm">Call Us</p>
                  </div>
                </a>
                <a href={`mailto:admin@carclinic.com`} target="_blank">
                  <div className={buttonVariants({ variant: "outline" })}>
                    <Mail
                      size={20}
                      className="text-dimPurple"
                      strokeWidth={1.75}
                    />
                    <p className="pl-2 text-sm">Send Us an Email</p>
                  </div>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TrackDetails;
