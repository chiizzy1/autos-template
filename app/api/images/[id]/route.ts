import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (
  req: Request,
  { params }: { params: { imageId: string } }
) => {
  const imageId = params.imageId;
  console.log(imageId);

  const { fileKey, fileUrl } =  await req.json()
  try {

    await db.images.update({
      where: { id: imageId  },
      data: { 
        fileKey,
        fileUrl,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        image: "successfully updated image",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          image: null,
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        image: null,
      }),
      { status: 500 }
    );
  }
};
