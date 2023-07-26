import { customerCare, towing } from "@/assets";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import SmallHeading from "@/components/ui/SmallHeading";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Mail, PhoneForwarded } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <LargeHeading>Towing & Roadside Assistance</LargeHeading>

          <div className="flex gap-6 flex-col sm:flex-row">
            <div className="w-full">
              <p>
                Welcome to our Towing & Roadside Assistance Services at Car
                Clinic! We understand that vehicle breakdowns can happen at any
                time, leaving you stranded and stressed. That&apos;s why we
                offer prompt and reliable towing and roadside assistance
                solutions to get you back on the road quickly and safely. Our
                team of trained professionals is available 24/7 to assist you,
                no matter the situation
              </p>

              <div className="mt-6 flex gap-4 items-center text-white">
                <a className="w-full" href={`tel:0123456789`} target="_blank">
                  <div className={buttonVariants({ variant: "purple" })}>
                    <PhoneForwarded
                      size={20}
                      strokeWidth={1.75}
                    />
                    <p className="pl-2 text-sm">0123456789</p>
                  </div>
                </a>
                <a
                  className="w-full"
                  href={`mailto:support@carclinic.com`}
                  target="_blank"
                >
                  <div className={buttonVariants({ variant: "purple" })}>
                    <Mail
                      size={20}
                      strokeWidth={1.75}
                    />
                    <p className="pl-2 text-sm">support@carclinic.com</p>
                  </div>{" "}
                </a>
              </div>
            </div>
            <div className="w-full">
              <div className="overflow-hidden relative rounded-lg w-full h-60">
                <Image
                  src={towing}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="towing_thumbnail"
                />
              </div>
            </div>
          </div>

          <SmallHeading className="pt-8">
            Here&apos;s what our Towing & Roadside Assistance services include:
          </SmallHeading>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Towing Services:</AccordionTrigger>
              <AccordionContent>
                If your vehicle is unable to move due to a mechanical issue,
                accident, or any other reason, our towing services are just a
                call away. Our modern tow trucks can safely transport your
                vehicle to our workshop or the destination of your choice.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger> Flat Tire Change:</AccordionTrigger>
              <AccordionContent>
                Don&apos;t worry if you experience a flat tire. Our technicians
                will quickly change your flat tire with your spare, so you can
                continue your journey with minimal delay.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Jump-Start Services:</AccordionTrigger>
              <AccordionContent>
                If your vehicle&apos;s battery is dead, our team can provide a
                jump-start to get your engine running again. We&apos;ll help you
                recharge your battery so you can be on your way.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Fuel Delivery:</AccordionTrigger>
              <AccordionContent>
                Accidentally run out of fuel? No problem! Our roadside
                assistance team can deliver fuel directly to your location,
                ensuring you have enough to reach the nearest gas station.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Lockout Assistance:</AccordionTrigger>
              <AccordionContent>
                Locked your keys inside your vehicle? Our skilled technicians
                can safely unlock your car without causing any damage, so you
                can access your keys and continue your day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Battery Replacement:</AccordionTrigger>
              <AccordionContent>
                If your vehicle&apos;s battery is beyond repair, we offer
                battery replacement services. We&apos;ll install a new,
                high-quality battery to keep your vehicle running smoothly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger> Winch-Out Services:</AccordionTrigger>
              <AccordionContent>
                If your vehicle is stuck in mud, snow, or other challenging
                terrains, our winch-out services can safely pull your vehicle to
                solid ground.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Emergency Repairs:</AccordionTrigger>
              <AccordionContent>
                Our technicians are equipped to handle minor on-the-spot repairs
                for common issues, helping you avoid more extensive damage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Accident Assistance:</AccordionTrigger>
              <AccordionContent>
                In the unfortunate event of an accident, we&apos;ll provide
                prompt assistance, including towing, to ensure your safety and
                minimize any further damage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>Long-Distance Towing: </AccordionTrigger>
              <AccordionContent>
                Planning a long trip? Our long-distance towing services can
                transport your vehicle to your desired location, ensuring a
                stress-free journey.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default page;
