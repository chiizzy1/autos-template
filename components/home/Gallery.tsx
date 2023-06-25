
import { cn } from "@/lib/utils";
import styles from "@/style";
import Image from "next/image";

const Gallery = () => (
  <section className="sm:py-16 py-6 w-full">
    <div className="container max-w-7xl mx-auto">
      <h3 className={`text-2xl text-dimPurple font-bold sm:pb-9 pb-6 w-full text-center`}>
        Our Gallery
      </h3>
      <div className="grid gap-6 grid-cols-fluid transition-all ease-in-out">
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="mechanic"
            priority
            width={1000}
            height={1000}
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/7541976/pexels-photo-7541976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md  overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/159293/car-engine-motor-clean-customized-159293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/7541976/pexels-photo-7541976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="brj"
            height={1000}
            width={1000}
          />
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
