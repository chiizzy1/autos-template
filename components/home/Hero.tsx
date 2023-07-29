import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { db } from "@/lib/db";

const Hero = async () => {
  const image = await db.pictures.findFirst({
    where: { id: process.env.HERO_BG_IMAGE_ID },
  });

  return (
    <section className="sm:pb-8 pb-4">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${image?.url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content  text-white">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-2xl sm:text-3xl text-left sm:text-center md:text-4xl font-bold">
              Expert Auto Solutions for a Smoother Ride <br />
            </h1>
            <p className="max-w-xl text-sm text-center text-zinc-300">
              Service you can trust for reliable and efficient automobile
              repairs and maintenance.
            </p>

            <div className="w-full flex items-center justify-center mt-6">
              <Link
                href={`/booking`}
                className={`${buttonVariants({
                  variant: "outline",
                })} text-base font-bold`}
              >
                Book Appointment
              </Link>
              <Link
                href={`/towing`}
                className={`${buttonVariants({
                  variant: "outline",
                })} text-base font-bold ml-8`}
              >
                Towing & Roadside Assistance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
