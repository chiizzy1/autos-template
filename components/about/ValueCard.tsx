import { FC } from "react";

interface ValueCardProps {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
}

const ValueCard: FC<ValueCardProps> = ({ content, title, icon }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 shadow-md rounded-md p-5 bg-sky-50 min-h-[12em]">
      <h4 className="text-lg font-bold text-dimPurple">{title}</h4>

      <p className="max-w-[17em] text-center font-normal text-xs">{content}</p>
      {icon}
    </div>
  );
};

export default ValueCard;
