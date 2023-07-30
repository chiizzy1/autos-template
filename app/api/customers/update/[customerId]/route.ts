import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const PUT = async (
  req: Request,
  { params }: { params: { customerId: string } }
) => {
  const data = await req.json();

  const customerId = params.customerId;

  // console.log(customerId, req.body)
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (user?.role !== "AUTHORIZED") {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action.",
          UpdatedCustomerData: null,
        }),
        { status: 401 }
      );
    }

    const getCustomer = await db.customer.findFirst({
      where: { id: customerId as string },
    });

    if (!getCustomer) {
      return new Response(
        JSON.stringify({
          error: "Customer does not exist!",
          UpdatedCustomerData: null,
        }),
        { status: 400 }
      );
    }

    const updateCustomerData = await db.customer.update({
      where: { id: customerId },
      data: { ...data },
    });

    return new Response(
      JSON.stringify({
        error: null,
        UpdatedCustomerData: updateCustomerData,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.issues,
          UpdatedCustomerData: null,
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        UpdatedCustomerData: null,
      }),
      { status: 500 }
    );
  }
};
