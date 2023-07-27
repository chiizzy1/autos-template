import AboutCard from "@/components/about/AboutCard";
import ValueCard from "@/components/about/ValueCard";
import AdminButtons from "@/components/ui/AdminButtons";
import LargeHeading from "@/components/ui/LargeHeading";
import { coreValues, whyChooseUs } from "@/constants";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <LargeHeading>About Us</LargeHeading>

          <section className="flex gap-6 md:flex-row flex-col transition-all ease-in-out">
            <div className="w-full flex items-center justify-center">
              <div className="rounded-lg overflow-hidden max-w-xl ">
                <Image
                  priority
                  width={1000}
                  height={1000}
                  quality={100}
                  style={{ objectFit: "cover" }}
                  src="https://images.pexels.com/photos/5649068/pexels-photo-5649068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="hero_bg"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="self-start">
                <h3 className="text-2xl text-dimPurple font-bold text-left sm:pb-7 pb-4 ">
                  Brief History
                </h3>
                <p className="max-w-xl text-left font-normal text-sm">
                  Car Clinic was founded in 2002 with a clear vision - to offer
                  seamless and stress-free automotive services to our valued
                  customers. Over the years, we have strived to turn this vision
                  into reality, and today, we stand as a trusted name in the
                  automotive industry. Our journey began with a commitment to
                  excellence and a passion for cars. We recognized the need for
                  a reliable and customer-centric automotive service center that
                  goes beyond just repairs and maintenance. Throughout our years
                  of operation, we have built a team of skilled and certified
                  technicians who share our dedication to providing exceptional
                  automotive care. Our technicians are not only experts in their
                  field but also automotive enthusiasts who genuinely love what
                  they do. They continuously upgrade their skills to stay ahead
                  of the latest automotive technologies and trends.
                </p>
                <AdminButtons />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-dimPurple sm:py-9 py-6 w-full text-center">
              Our Core Values
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all ease-in-out">
              {coreValues.map((value) => (
                <ValueCard key={value.id} {...value} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-dimPurple sm:py-9 py-6 w-full text-center">
              Why Choose Us?
            </h3>

            <div className="flex flex-col ustify-center items-center gap-6">
              {whyChooseUs.map((reason) => (
                <AboutCard key={reason.id} {...reason} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
