import { people01 } from "@/assets";
import Image from "next/image";
import { FC } from "react";

interface CustomerCardProps {}

const CustomerCard: FC<CustomerCardProps> = ({}) => {
  return (
    <div className=" bg-white shadow-lg border p-4 rounded-lg">
      <div className="flex gap-4">
        <div className="rounded-full overflow-hidden">
          <Image src={people01} alt="profile image" width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-xl">John Doe</h3>
          <p className="text-xs">
            <strong>Email:</strong> johnny@gmail.com
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-xs">
          <strong>Phone:</strong> johnny@gmail.com
        </p>
        <p className="text-xs">
          <strong>Latest transaction:</strong> johnny@gmail.com
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;