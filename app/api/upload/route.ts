import { db } from "@/lib/db";
import { Images } from "@prisma/client";
import { z } from "zod";

export const POST = async (req: Request) => {
  const { fileUrl, fileKey }: Images = await req.json();
  console.log("url:", `${fileUrl}`);
  console.log("key:", fileKey);
  try {
    await db.images.create({
      data: {
        fileUrl: fileUrl,
        fileKey: fileKey,
        description: "w"
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        status: "successfully uploaded image",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          status: false,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        status: false,
      }),
      { status: 500 }
    );
  }
};
