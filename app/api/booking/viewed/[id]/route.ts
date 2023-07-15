import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          updated: false,
        }),
        { status: 401 }
      );
    }

    await db.appointmentClient.update({
      where: { id: id },
      data: { viewed: true },
    });

    return new Response(
      JSON.stringify({
        error: "Customer does not exist!",
        updated: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          updated: false,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        updated: false,
      }),
      { status: 500 }
    );
  }
};
