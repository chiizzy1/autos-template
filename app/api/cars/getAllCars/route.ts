import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const GET = async (req: Request) => {
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          CarData: null,
        }),
        { status: 401 }
      );
    }

    const getAllCarsData = await db.carDetails.findMany({
      include: {
        owner: true,
        repair: true,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        CarData: getAllCarsData,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          CarData: null,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        CarData: null,
      }),
      { status: 500 }
    );
  }
};
