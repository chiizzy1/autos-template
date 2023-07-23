import EditImageCard from "@/components/dashboard/EditImageCard";
import { db } from "@/lib/db";




const EditImage = async () => {
  
  const images = await db.pictures.findMany({})

  return (
    <main className="min-h-screen">
      {images &&
        images.map(obj => <EditImageCard image={obj} key={obj.id} />)}
    </main>
  );
};

export default EditImage;
