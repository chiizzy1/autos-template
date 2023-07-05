import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (
  req: Request,
  { params }: { params: { date: string } }
) => {
  const date = params.date;
  try {
    const getDaySessions = await db.selectedDay.findFirst({
      where: {
        day: date,
      },
      include: {
        selectedSesions: true,
      },
    });

    if (!getDaySessions) {
      const newDay = await db.selectedDay.create({
        data: {
          day: date,
        },
        include: {
          selectedSesions: true,
        },
      });

      return new Response(
        JSON.stringify({
          error: null,
          selected: newDay,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        error: null,
        selected: getDaySessions,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          selected: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        selected: null,
      }),
      { status: 500 }
    );
  }
};
