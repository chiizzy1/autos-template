import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const DELETE = async (
  req: Request,
  { params }: { params: { carId: string } }
) => {
  const carId = params.carId;
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          success: false,
        }),
        { status: 401 }
      );
    }

    const getCar = await db.carDetails.findFirst({
      where: { id: carId as string },
    });

    if (!getCar) {
      return new Response(
        JSON.stringify({
          error: "Car does not exist!",
          success: false,
        }),
        { status: 400 }
      );
    }

    await db.carDetails.delete({
      where: { id: carId as string },
    });

    return new Response(
      JSON.stringify({
        error: null,
        success: "Successfully deleted car data!",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          success: false,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        success: false,
      }),
      { status: 500 }
    );
  }
};
