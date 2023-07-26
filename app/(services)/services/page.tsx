import ServicesCard from "@/components/services/ServicesCard";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { services } from "@/constants";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="flex items-center justify-center">
      <div className="container max-w-7xl mx-auto sm:py-16 py-6 w-full">
        <LargeHeading>OUR SERVICES</LargeHeading>
        <div className="flex flex-col justify-center xs:grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all ease-in-out">
          {services.map(({ description, id, image, title }) => (
            <ServicesCard
              key={id}
              description={description}
              image={image}
              title={title}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
