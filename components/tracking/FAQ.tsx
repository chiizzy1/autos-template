import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Link from "next/link";

const FAQ: FC = () => (
  <div className="rounded-lg sm:py-9 py-6 ">
    <h3 className="text-2xl text-dimPurple font-bold sm:pb-6 pb-4">
      Frequently asked questions
    </h3>

    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is tracking id?</AccordionTrigger>
        <AccordionContent>
          A tracking ID is a unique code assigned to your car repair at Car
          Clinic. It allows you to monitor the progress of your repair,
          providing real-time updates on its status. With the tracking ID, you
          can stay informed about the various stages of the repair process, from
          scheduling to completion. It ensures transparency and allows you to
          anticipate when your car will be ready for pickup.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get a tracking id?</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc">
            <li className="pb-2">
              <strong>Schedule your repair:</strong><br/> Contact Car Clinic to book
              an appointment for your car repair. Provide them with the
              necessary details about your vehicle and the repair required.
            </li>

            <li className="pb-2">
              <strong>Receive the tracking ID: </strong><br/> Once your repair
              appointment is confirmed, Car Clinic will assign a unique tracking
              ID to your repair order. This ID serves as a reference for
              tracking the progress of your repair.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Forgot your tracking ID?</AccordionTrigger>
        <AccordionContent>
          <p className="underline underline-offset-1 pb-2">
            Follow these simple steps to retrieve your tracking ID:
          </p>

          <ul className="list-disc">
            <li className="pb-2">
              <strong>Contact Car Clinic:</strong><br/> Reach out to the{" "}
              <Link
                className="text-dimPurple"
                href="/contact"
              >
                Car Clinic customer support team
              </Link>{" "}
              and talk to an agent about your forgotten tracking ID and request
              for assistance in retrieving it.
            </li>

            <li className="pb-2">
              <strong>Provide necessary information:</strong><br/> Car Clinic will
              ask for specific details to verify your identity and retrieve your
              tracking ID. Be prepared to provide information such as your name,
              contact details, and any relevant information about your car.
            </li>

            <li className="pb-2">
              <strong>Assistance from customer support:</strong><br/> After verifying
              your identity, Car Clinic&apos;s customer support team will assist
              you in retrieving your tracking ID instantly.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Do I have to pay for this service?</AccordionTrigger>
        <AccordionContent>No, it&apos;s totally free.</AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default FAQ;
