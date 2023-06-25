import { FC } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { RxPerson } from "react-icons/rx";
import { AiOutlineCar, AiOutlineWallet } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";

interface TopCardsProps {
  customers: [];
  cars: [];
  repairs: [];
}

const TopCards: FC<TopCardsProps> = ({ customers, cars, repairs }) => {
  let init = 0;
  const totalRevenue = repairs.map((obj: any) => (init += obj.estimatedCost));
  return (
    <div className="grid lg:grid-cols-4 gap-4 p-4">
      <div className="lg:col-span-1 col-span-1 bg-white shadow-lg flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col justify-between">
          <p className="">Customers</p>
          <p className="text-gray-600 py-2">{customers.length}</p>
          <span className="text-xs text-gray-600 underline">
            See all Customers
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex text-red-500">
            <TiArrowSortedDown />
            <span>-5%</span>
          </div>
          <div className="p-2 bg-red-300 flex items-center justify-center rounded-sm">
            <RxPerson size={20} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-white shadow-lg flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col justify-between">
          <p className="">Cars</p>
          <p className="text-gray-600 py-2">{cars.length}</p>
          <span className="text-xs text-gray-600 underline">See all Cars</span>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex text-green-500">
            <TiArrowSortedDown />
            <span>-5%</span>
          </div>
          <div className="p-2 bg-red-300 flex items-center justify-center rounded-sm">
            <AiOutlineCar size={20} />{" "}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-white shadow-lg flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col justify-between">
          <p className="">Repairs</p>
          <p className="text-gray-600 py-2">{repairs.length}</p>
          <span className="text-xs text-gray-600 underline">
            See all repairs
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex text-green-500">
            <TiArrowSortedUp />
            <span>+25%</span>
          </div>
          <div className="p-2 bg-red-300 flex items-center justify-center rounded-sm">
            <GiAutoRepair size={20} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-white shadow-lg flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col justify-between">
          <p className="">Total Revenue</p>
          <p className="text-gray-600 py-2">{init.toLocaleString("en")}</p>
          <span className="text-xs text-gray-600 underline">See smoke</span>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex text-green-500">
            <TiArrowSortedUp />
            <span>-5%</span>
          </div>
          <div className="p-2 bg-red-300 flex items-center justify-center rounded-sm">
            <AiOutlineWallet size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
