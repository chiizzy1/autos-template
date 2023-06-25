import { FC } from "react";
import { customerCare } from "@/assets";
import Image from "next/image";
import TrackingUi from "@/components/tracking/TrackingUi";
import Table from "@/components/ui/Table";

const info = [
  {
    id: 1,
    carId: 1,
    description: "Engine tune-up",
    estimatedCost: 300,
    status: "Check-In",
  },
];

const page: FC = () => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <TrackingUi />
          {/* <FAQ /> */}
          <h4 className="text-dimPurple font-bold sm:py-9 py-6 w-full text-center">
            Tracking Details
          </h4>
          <Table info={info} />
          <div className="flex gap-8 sm:flex-row flex-col sm:py-9 py-6">
            <div className="w-full rounded-md bg-green-100 p-6">
              <h4 className="font-semibold text-center">Car Repair Status</h4>
              {/* <TrackUI status={info[0].status} /> */}
            </div>

            <div className="w-full bg-sky-200 border rounded-md p-6">
              <h4 className="font-semibold text-center">Not Satisfied?</h4>
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
      </div>
    </main>
  );
};

export default page;
