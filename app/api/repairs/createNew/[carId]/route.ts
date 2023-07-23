import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (
  req: Request,
  { params }: { params: { carId: string } }
) => {
  const carId = params.carId;
  const data = await req.json();

  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          RepairData: null,
        }),
        { status: 401 }
      );
    }

    const getCarOwnerId = await db.carDetails.findUnique({
      where: { id: carId },
    });

    if (!getCarOwnerId) {
      return new Response(
        JSON.stringify({
          error: "Car does not exist.",
          RepairData: null,
        }),
        { status: 400 }
      );
    }
    let finishDate: Date | null = null;
    let deliveryDate: Date | null = null;

    if (data.fixed) {
      finishDate = new Date();
    }

    if (data.delivered) {
      deliveryDate = new Date();
    }

    const repairData = await db.repair.create({
      data: {
        ...data,
        finishDate: finishDate,
        deliveryDate: deliveryDate,
        carId: carId,
        customerId: getCarOwnerId.ownerId,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        RepairData: repairData,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          RepairData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        RepairData: null,
      }),
      { status: 500 }
    );
  }
};
