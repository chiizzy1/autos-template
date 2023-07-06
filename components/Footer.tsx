import Link from "next/link";
import { footerLinks, socialMedia } from "@/constants";
import { buttonVariants } from "./ui/Button";

export default function Footer() {
  return (
    <section className="sm:py-16 py-6 w-full bg-white z-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-fluid pb-6">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className="text-dimPurple text-sm font-semibold">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-xs text-black hover:text-stone-600 cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ss:my-0 my-4 min-w-[150px]">
            <span className="text-dimPurple text-sm font-semibold ">Newsletter</span>
            <div className="flex flex-col gap-2 mt-4">
              <label >
                <span className="font-normal text-sm text-black">Get latest info about car fixes</span>
              </label>
              <input type="text" placeholder="Enter your email address" className="input border border-dimPurple w-full bg-transparent" />

              <Link href={`/`} className={`${buttonVariants({ variant: 'outline' })}`}>Submit</Link>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
          <p className="font-poppins font-normal text-center text-xs leading-[27px] text-stone-600">
            Copyright Ⓒ 2023 Car Clinic. All Rights Reserved.
          </p>

          <div className="flex flex-row md:mt-0 mt-6">
            {socialMedia.map((social, index) => (
              <Link
                href={`${social.link}`}
                key={social.id}
                className={`${
                  index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                }`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
