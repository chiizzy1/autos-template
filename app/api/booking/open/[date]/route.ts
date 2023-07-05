import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (
  req: Request,
  { params }: { params: { date: string } }
) => {
  const date = params.date;
  const { currentStatus } = await req.json();

  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          openStatus: null,
        }),
        { status: 401 }
      );
    }

    if (!date) {
      return new Response(
        JSON.stringify({
          error: null,
          openStatus: "please select a valid date!",
        }),
        { status: 200 }
      );
    }

    let dayId: string = "";

    const getDay = await db.selectedDay.findFirst({
      where: { day: date },
    });

    if (!getDay) {
      const newDay = await db.selectedDay.create({
        data: {
          day: date,
        },
      });

      dayId = newDay.id;
    } else {
      dayId = getDay.id;
    }

    await db.selectedDay.update({
      where: { id: dayId },
      data: {
        open: !currentStatus,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        openStatus: "successfully updated date!",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          openStatus: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        openStatus: null,
      }),
      { status: 500 }
    );
  }
};
