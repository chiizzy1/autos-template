import { stats } from "@/constants";
import { FC } from "react";

interface StatsProps {}

const Stats: FC<StatsProps> = ({}) => {
  return (
    <section className="sm:py-8 py-4 container max-w-7xl mx-auto">
      <div className="flex items-center justify-center flex-wrap bg-sky-50 shadow-md rounded-md p-2">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`flex-1 flex justify-start items-center flex-row m-3`}
          >
            <h4 className="font-semibold text-xl text-dimPurple">
              {stat.value}
            </h4>
            <p className="font-normal text-xs ml-1">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
