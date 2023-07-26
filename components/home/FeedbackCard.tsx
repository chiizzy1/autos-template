import { quotes } from "@/assets";
import Image from "next/image";

import { FC } from "react";

interface FeedbackCardProps {
  content: string;
  name: string;
  title: string;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ content, name, title }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-5 bg-sky-50 ">
      <Image
        src={quotes}
        alt="double_quotes"
        className="w-[42.6px] h-[27.6px] object-contain sm:mb-4 mb-2"
      />
      <p className="sm:mb-4 mb-2 text-xs max-w-[370px]">{content}</p>

      <div className="flex flex-col">
        <h4 className="text-sm font-medium leading-[32px]">{name}</h4>
        <p className="text-xs">{title}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
