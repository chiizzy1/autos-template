import { db } from "@/lib/db";
import { z } from "zod";

export const GET = async (
  req: Request,
) => {
  try {

    const allImages = await db.pictures.findMany({})

    return new Response(
      JSON.stringify({
        error: null,
        images: allImages,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          images: null,
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        images: null,
      }),
      { status: 500 }
    );
  }
};
