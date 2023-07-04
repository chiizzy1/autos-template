import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    carMake,
    carModel,
    carYear,
    plateNumber,
    estimatedCost,
    paid,
    fixed,
    description,
    repairStatus,
  } = await req.json();

  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          clientData: null,
        }),
        { status: 401 }
      );
    }

    let customerId = "";
    let carId = "";
    let repairId = "";


    // Create Customer
    const existingCustomerEmail = await db.customer.findUnique({
      where: { email: email },
    });
    const existingCustomerPhone = await db.customer.findFirst({
      where: { phone: phone },
    });

    if (existingCustomerEmail) {
      return new Response(
        JSON.stringify({
          error: "Customer with the same email already exists!",
          clientData: null,
        }),
        { status: 401 }
      );
    }

    if (existingCustomerPhone) {
      return new Response(
        JSON.stringify({
          error: "Customer with the same phone number already exists!",
          clientData: null,
        }),
        { status: 401 }
      );
    }

    const customerData = await db.customer.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        adminId: user.id,
      },
    });

    customerId = customerData.id;

    // Create car
    if (customerId) {
      const existingCar = await db.carDetails.findFirst({
        where: { plateNumber: plateNumber },
      });

      if (existingCar) {
        return new Response(
          JSON.stringify({
            error: "Car with same plate number already exists!",
            clientData: null,
          }),
          { status: 401 }
        );
      }

      const carData = await db.carDetails.create({
        data: {
          plateNumber: plateNumber,
          make: carMake,
          model: carModel,
          year: carYear,
          ownerId: customerId,
        },
      });

      carId = carData.id;
    }

    // Create Repair

    if (customerId && carId) {
      let finishDate: Date | null = null;

      if (fixed == true) {
        finishDate = new Date();
      }

      const repairData = await db.repair.create({
        data: {
          finishDate: finishDate,
          description,
          estimatedCost,
          repairStatus,
          carId,
          customerId,
          fixed,
          paid,
        },
      });

      repairId = repairData.id;
    }

    return new Response(
      JSON.stringify({
        error: null,
        clientData: { customerId, carId, repairId },
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          clientData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        clientData: null,
      }),
      { status: 500 }
    );
  }
};
