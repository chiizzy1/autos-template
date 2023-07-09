import Image from "next/image";
import { FC } from "react";

interface ServicesCardProps {
  description: string;
  image: string;
  title: string;
}

const ServicesCard: FC<ServicesCardProps> = ({ description, image, title }) => {
  return (
    <div className="flex flex-col rounded-lg max-w-xl items-center overflow-hidden shadow bg-sky-50">
      <div className="w-full flex items-center justify-center">
        <Image src={image} width={500} height={500} alt={`${title}_services`} />
      </div>
      <div className="p-6 ">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
