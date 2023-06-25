import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  const { email, firstName, lastName, phone } = await req.json();
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
          customerData: null,
        }),
        { status: 401 }
      );
    }

    if (existingCustomerPhone) {
      return new Response(
        JSON.stringify({
          error: "Customer with the same phone number already exists!",
          customerData: null,
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

    return new Response(
      JSON.stringify({
        error: null,
        customerData: customerData,
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
