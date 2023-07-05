import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (
  req: Request,
  { params }: { params: { trackId: string } }
) => {
  const trackId = params.trackId;
  console.log(trackId);
  try {
    const trackInfo = await db.repair.findFirst({
      where: { trackId: trackId as string },
      include: {
        owner: true,
        car: true,
      },
    });

    if (trackInfo) {
      const {
        car,
        owner,
        description,
        estimatedCost,
        paid,
        fixed,
        repairStatus,
        startDate,
        finishDate,
      } = trackInfo;

      const { make, model, year } = car;

      const { firstName, lastName } = owner;

      return new Response(
        JSON.stringify({
          error: null,
          trackData: {
            description,
            estimatedCost,
            paid,
            fixed,
            repairStatus,
            startDate,
            finishDate,
            make,
            model,
            year,
            firstName,
            lastName,
          },
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Invalid Tracking ID!!",
        trackData: null,
      }),
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          trackData: null,
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        trackData: null,
      }),
      { status: 500 }
    );
  }
};