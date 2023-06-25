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
          customerData: null,
        }),
        { status: 401 }
      );
    }

    const getAllCustomersData = await db.customer.findMany({
      include: {
        cars: true,
        repairs: true,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        customerData: getAllCustomersData,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          customerData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        customerData: null,
      }),
      { status: 500 }
    );
  }
};
