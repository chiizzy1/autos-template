import styles from "@/style";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

const Hero = () => {
  return (
    <section className="sm:pb-16 pb-6">
      {/* <div className="relative min-h-screen ">
        
        <div className='w-full'>
            <Image
              priority
              className='img-shadow '
              quality={100}
              style={{ objectFit: 'cover' }}
              fill
              src='https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=600'
              alt='hero_bg'
            />
        </div>
        <div className={`container absolute max-w-7xl mx-auto mt-12`}>
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
      </div> */}

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
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
