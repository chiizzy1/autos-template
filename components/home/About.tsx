import { db } from "@/lib/db";
import Image from "next/image";

const About = async () => {
  const image = await db.pictures.findFirst({
    where: { id: process.env.ABOUT_IMAGE_ID },
  });

  return (
    <section className={`sm:py-8 py-4 w-full`}>
      <div className="container max-w-7xl mx-auto">
        <div className="flex gap-6 md:flex-row flex-col transition-all ease-in-out">
          <div className="w-full flex items-center justify-center">
            <div className="rounded-lg overflow-hidden max-w-xl ">
              <Image
                priority
                width={1000}
                height={1000}
                quality={100}
                style={{ objectFit: "cover" }}
                src={image?.url!}
                alt="hero_bg"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="self-start">
              <h3 className="text-2xl text-dimPurple font-bold text-left sm:pb-7 pb-4 ">
                About Us
              </h3>
              <p className="max-w-xl text-left font-normal text-sm">
                At our automobile workshop, we provide high-quality repairs and
                maintenance services to keep your vehicle in top condition. Our
                team of experienced mechanics has the skills and expertise to
                handle any repair, from minor issues li ke oil changes and tire
                rotations to major engine overhauls. We understand how important
                your vehicle is to your daily life, which is why we are
                committed to providing fast, efficient service that gets you
                back on the road as quickly as possible. We use only the best
                parts and equipment to ensure your vehicle runs smoothly and
                safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
