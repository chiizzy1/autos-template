import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const POST = async (req: Request) => {
  const { image } = await req.json();
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          uploadSuccess: false,
        }),
        { status: 401 }
      );
    }

    if (!image){
      return new Response(
        JSON.stringify({
          error: "Please upload a valid image.",
          uploadSuccess: false,
        }),
        { status: 400 }
      );
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    // Save to db
    const saveDB = await db.pictures.create({
      data: {
        key: result.public_id,
        url: result.secure_url,
        adminId: user.id,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        uploadSuccess: saveDB,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          uploadSuccess: false,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        uploadSuccess: false,
      }),
      { status: 500 }
    );
  }
};
