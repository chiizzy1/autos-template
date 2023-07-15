import Image from "next/image";
import { FC } from "react";
import { AiOutlineRight } from "react-icons/ai";

interface ServicesCardProps {
  description: string;
  image: string;
  title: string;
}

const ServicesCard: FC<ServicesCardProps> = ({ description, image, title }) => {
  return (
    <div className="flex flex-col rounded-lg max-w-lg items-center overflow-hidden shadow-lg">
      <div className="w-full flex items-center justify-center">
        <Image src={image} width={520} height={500} alt={`${title}_services`} />
      </div>
      <div className="p-6 ">
        <h4 className="text-lg font-bold text-dimPurple">{title}</h4>
        <p className="text-xs pt-4">{description}</p>
        <div className="flex pt-6 items-center text-dimPurple gap-1 hover:gap-2 cursor-pointer">
          <p className="text-xs">view more</p>
          <AiOutlineRight className="text-xs" />
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
