import { customerCare } from "@/assets";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <LargeHeading>Towing & Roadside Assistance</LargeHeading>
          <Paragraph>We&apos;re always here to assist you</Paragraph>

          <div className="flex gap-6 flex-col md:flex-row">
            <Paragraph className="w-full">
              Our team of skilled technicians is available around the clock to
              provide prompt and professional assistance. Whether you&apos;re
              dealing with a flat tire, battery jump-start, lockout situation,
              or need your vehicle towed to a repair facility, we&apos;ve got
              you covered.
            </Paragraph>

            <div className="w-full">
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <Link href={""}>admin@carclinc.com</Link>
                  <Link href={""}>23456789</Link>
                </div>
                <Image src={customerCare} width={100} height={100} alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
