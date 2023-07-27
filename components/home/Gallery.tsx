import { db } from "@/lib/db";
import Image from "next/image";

const Gallery = async () => {
  const images = await db.pictures.findMany({});

  const filtered = images.filter(
    (image) =>
      image.id !== process.env.HERO_BG_IMAGE_ID &&
      image.id !== process.env.ABOUT_IMAGE_ID
  );

  return (
    <section className="sm:py-8 py-4 w-full">
      <div className="container max-w-7xl mx-auto">
        <h3
          className={`text-2xl text-dimPurple font-bold sm:pb-9 pb-6 w-full text-center`}
        >
          Our Gallery
        </h3>
        <div className="grid gap-6 grid-cols-fluid transition-all ease-in-out">
          {filtered &&
            filtered.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden relative rounded-lg w-full h-40"
              >
                <Image
                  src={image.url}
                  alt="gallery_image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
