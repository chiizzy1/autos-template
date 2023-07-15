import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";
import { FC } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="flex items-center justify-center">
      <div className="container max-w-7xl sm:py-16 py-6 mx-auto">
        <LargeHeading>Contact Us</LargeHeading>
        <div className="flex gap-6 flex-col items-center justify-center sm:flex-row">
          <div className="flex flex-col">
            <Paragraph className="max-w-lg">
              We value your feedback, inquiries, and any other communication you
              may have. Our dedicated team is ready to assist you with any
              questions or concerns you might have regarding our services,
              appointments, or general automotive needs. Feel free to reach out
              to us using the contact information provided below. We&apos;re
              available during business hours to provide prompt and helpful
              responses. You can also use the chat widget on our website to send
              us a message directly and get instant response.
            </Paragraph>

            <div className="flex my-4 text-dimPurple items-center">
              <BsTelephone className="mr-2" />
              <a href="tel:012232123" target="_blank">
                012232123
              </a>
            </div>
            <div className="flex text-dimPurple items-center">
              <AiOutlineMail className="mr-2" />
              <a href="mailto:support@carclinic.com" target="_blank">
                support@carclinic.com
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="https://uploadthing.com/f/5c654756-4113-46b6-b9ed-402bca88b08b_customer-service.png"
              height={200}
              width={200}
              alt="customer_care"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
