import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const repairInfo = await req.json();
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

    let finishDate: Date | null = null;
    let deliveryDate: Date | null = null;

    if (repairInfo.fixed) {
      finishDate = new Date();
    }

    if (repairInfo.delivered) {
      deliveryDate = new Date();
    }


    const repairData = await db.repair.create({
      data: {
        ...repairInfo,
        finishDate: finishDate,
        deliveryDate: deliveryDate
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
