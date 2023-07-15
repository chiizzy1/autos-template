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
          bookingsData: null,
        }),
        { status: 401 }
      );
    }

    const allBookings = await db.appointmentClient.findMany({
        include: {
            selectedSession: true,
        }
    })

    return new Response(
      JSON.stringify({
        error: null,
        bookingsData: allBookings,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          bookingsData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        bookingsData: null,
      }),
      { status: 500 }
    );
  }
};
