import { FC } from "react";
import { done, four, one, three, two } from "@/assets";
import Image from "next/image";

interface trackUiProps {
  status: string;
}

const TrackUi: FC<trackUiProps> = ({ status }) => {
  let stage: number =
    status === "Check-In"
      ? 1
      : status === "In-Progress"
      ? 2
      : status === "Ready-for-Pick-up"
      ? 3
      : 4;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:py-9 py-6">
      <div className="flex flex-row justify-start sm:flex-col sm:justify-center gap-4">
        <Image src={done} width={30} height={30} alt="icon" />
        <p className="text-xs font-medium">Check-In</p>
      </div>

      <div className="flex flex-row justify-start sm:flex-col sm:justify-center gap-4">
        <Image
          src={stage >= 2 ? done : two}
          width={30}
          height={30}
          alt="icon"
        />
        <p className="text-xs font-medium">Repair in Progress</p>
      </div>

      <div className="flex flex-row justify-start sm:flex-col sm:justify-center gap-4">
        <Image
          src={stage >= 3 ? done : three}
          width={30}
          height={30}
          alt="icon"
        />
        <p className="text-xs font-medium">Ready for Pick-up</p>
      </div>

      <div className="flex flex-row justify-start sm:flex-col  sm:justify-center gap-4">
        <Image
          src={stage >= 4 ? done : four}
          width={30}
          height={30}
          alt="icon"
        />
        <p className="text-xs font-medium">Delivered</p>
      </div>
    </div>
  );
};

export default TrackUi;
