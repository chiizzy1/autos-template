import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface ServicesCardProps {
  content: string;
  title: string;
  icon: string | StaticImageData;
}

const ServicesCard: FC<ServicesCardProps> = ({ content, title, icon }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 shadow-md rounded-md p-5 bg-sky-50 min-h-[12em]">
      <h4 className="text-lg font-bold text-dimPurple">{title}</h4>

      <p className="max-w-[17em] text-center font-normal text-xs">{content}</p>
      <Image src={icon} alt="icon" width={40} height={40} />
    </div>
  );
};

export default ServicesCard;
