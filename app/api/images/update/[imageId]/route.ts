import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (
  req: Request,
  { params }: { params: { imageId: string } }
) => {
  const imageId = params.imageId;
  const { newImage, oldImageUrl } = await req.json();
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          updateSuccess: false,
        }),
        { status: 401 }
      );
    }

    // Check if image Id passed with URL is valid
    const getOldImage = await db.pictures.findUnique({
      where: { id: imageId },
    });

    if (!getOldImage) {
      return new Response(
        JSON.stringify({
          error: "Image does not exist!",
          updateSuccess: null,
        }),
        { status: 400 }
      );
    }

    // Upload new image to Cloudinary and get the parameters
    const result = await cloudinary.uploader.upload(newImage);

    const editImage = await db.pictures.update({
      where: { id: imageId },
      data: {
        key: result.public_id,
        url: result.secure_url,
      },
    });

    // Delete old image from cloudinary
    await cloudinary.uploader.destroy(oldImageUrl);

    return new Response(
      JSON.stringify({
        error: null,
        updateSuccess: editImage,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          updateSuccess: false,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        updateSuccess: false,
      }),
      { status: 500 }
    );
  }
};
