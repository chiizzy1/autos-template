import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const GET = async (
  req: Request,
  { params }: { params: { customerId: string } }
) => {
  const customerId = params.customerId;
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

    const getRepairData = await db.repair.findMany({
      where: {
        customerId: customerId,
      },
      include: {
        car: true,
        owner: true,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        RepairData: getRepairData,
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
