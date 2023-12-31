import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  //   console.log(id);

  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          success: null,
        }),
        { status: 401 }
      );
    }

    await db.customer.delete({
      where: { id: id as string },
    });

    return new Response(
      JSON.stringify({
        error: null,
        success: "Successfully deleted customer data",
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
        { status: 401 }
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
