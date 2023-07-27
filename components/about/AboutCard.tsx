import { FC } from "react";
import SmallHeading from "../ui/SmallHeading";
import Image from "next/image";

interface AboutCardProps {
  id: string;
  title: string;
  content: string;
  image: string;
  index: number;
}

const AboutCard: FC<AboutCardProps> = ({ title, content, image, index }) => {
  return (
    <div
      className={`max-w-5xl flex flex-col  gap-4 transition-all ease-in-out  ${
        index % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="w-full flex flex-col justify-center p-4">
        <SmallHeading className="mb-4">{title}</SmallHeading>
        <p className="text-base">{content} </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="why_us_thumbnail"
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
