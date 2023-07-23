import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const PUT = async (
  req: Request,
  { params }: { params: { carId: string } }
) => {
  const carId = params.carId;
  const { plateNumber, carMake, carModel, carYear } = await req.json();

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

    const updateCarData = await db.carDetails.update({
      where: {
        id: carId,
      },
      data: {
        plateNumber: plateNumber,
        make: carMake,
        model: carModel,
        year: carYear,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        CarData: updateCarData,
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
        { status: 401 }
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
