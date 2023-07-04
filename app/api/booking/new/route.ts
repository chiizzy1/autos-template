import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const {
    carMake,
    carModel,
    carYear,
    date,
    dayId,
    email,
    firstName,
    lastName,
    message,
    phone,
    time,
  } = await req.json();

  try {
    let clientId: string | null = null;
    // let dayId: string | null = null;

    const clientData = await db.appointmentClient.create({
      data: {
        email: email,
        make: carMake,
        model: carModel,
        year: carYear,
        name: `${lastName} ${firstName}`,
        phone: phone,
        reason: message,
      },
    });

    clientId = clientData.id;

    console.log("clientId:", clientId);

    // const dayData = await db.selectedDay.findFirst({
    //   where: { day: `${date}` },
    // });

    // dayId = dayData!.id;
    // console.log("dayId:", dayId);

    await db.selectedSesion.create({
      data: {
        time: `${time}`,
        clientId: clientId,
        dayId: dayId,
      },
    });

    return new Response(
      JSON.stringify({
        error: null,
        booking: "Appointment successfully booked!",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          booking: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        booking: null,
      }),
      { status: 500 }
    );
  }
};
