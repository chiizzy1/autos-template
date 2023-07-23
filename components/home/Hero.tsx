import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { db } from "@/lib/db";

const Hero = async () => {

  const image = await db.pictures.findFirst({
    where: {id: process.env.HERO_BG_IMAGE_ID }
  })

  return (
    <section className="sm:pb-16 pb-6">

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${image?.url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content  text-white">
          <div className="max-w-xl">
            <h1 className="mb-5 text-3xl font-bold">
              Expert Auto Solutions for a Smoother Ride
              <br />{" "}
            </h1>
            <div className="w-full flex">
              <Link
                href={`/booking`}
                className={`${buttonVariants({
                  variant: "hero"
                })} text-sm font-bold`}
              >
                Book Appointment
              </Link>
              <Link
                href={`/towing`}
                className={`${buttonVariants({
                  variant: "hero"
                })} text-sm font-bold ml-8`}
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
