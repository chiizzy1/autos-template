import EditImageCard from "@/components/dashboard/EditImageCard";
import Header from "@/components/dashboard/Header";
import SmallHeading from "@/components/ui/SmallHeading";
import { db } from "@/lib/db";

const EditImage = async () => {
  const images = await db.pictures.findMany({});

  return (
    <main className="min-h-screen ">
      <Header page="" />
      <SmallHeading className="p-4 mt-8">
        Select an image to see options
      </SmallHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-4 p-4">
        {images &&
          images.map((image) => (
            <EditImageCard key={image.id} image={image} />
          ))}
      </div>
    </main>
  );
};
export default EditImage;
