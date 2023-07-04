import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const { plateNumber, carMake, carModel, carYear, ownerId } = await req.json();

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

    const existingCar = await db.carDetails.findFirst({
      where: { plateNumber: plateNumber },
    });

    if (existingCar) {
      return new Response(
        JSON.stringify({
          error: "Car with same plate number already exists!",
          CarData: null,
        }),
        { status: 400 }
      );
    }

    const carData = await db.carDetails.create({
      data: {
        plateNumber: plateNumber,
        make: carMake,
        model: carModel,
        year: carYear,
        ownerId: ownerId,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        CarData: carData,
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
