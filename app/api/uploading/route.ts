import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const { fileUrl, fileKey } = await req.json();
  console.log("url:", `${fileUrl}`);
  console.log("key:", fileKey);
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          data: null,
        }),
        { status: 401 }
      );
    }

    await db.pictures.create({
      data: {
        key: fileKey,
        url: fileUrl,
        adminId: user.id,
      },
    });
    return new Response(
      JSON.stringify({
        error: null,
        data: "successfully uploaded image",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          data: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        data: null,
      }),
      { status: 500 }
    );
  }
};
