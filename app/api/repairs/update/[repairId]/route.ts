import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const PUT = async (
  req: Request,
  { params }: { params: { repairId: string } }
) => {
  const data = await req.json();

  const repairId = params.repairId;

  // console.log(repairId, req.body)
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          UpdatedRepairData: null,
        }),
        { status: 401 }
      );
    }

    const getRepair = await db.repair.findFirst({
      where: { id: repairId as string },
    });

    if (!getRepair) {
      return new Response(
        JSON.stringify({
          error: "Repair details does not exist!",
          UpdatedRepairData: null,
        }),
        { status: 401 }
      );
    }

    let finishDate: Date | null = null;
    let deliveryDate: Date | null = null;

    if (data.fixed == true) {
      finishDate = new Date();
    }

    if (data.delivered == true) {
      deliveryDate = new Date();
    }

    const updateRepairData = await db.repair.update({
      where: { id: repairId as string },
      data: {
        ...data,
        deliveryDate: deliveryDate,
        finishDate: finishDate,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        UpdatedRepairData: updateRepairData,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          UpdatedRepairData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        UpdatedRepairData: null,
      }),
      { status: 500 }
    );
  }
};
