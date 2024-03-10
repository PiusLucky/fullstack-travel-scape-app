import { createOrder, getAllOrders } from "@/lib/actions/order";
import { error_response, success_response, validateToken } from "@/lib/utils";
import { CreateOrderInputValidation } from "@/lib/validations";
import { OrderData } from "@/types";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    const validatedToken = await validateToken(token);

    const body = await req.json();

    const inputValidation = CreateOrderInputValidation.safeParse(body);

    if (!inputValidation.success) {
      return error_response(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    const order = await createOrder({
      ...body,
      userId: validatedToken?.userId,
    } as OrderData);

    return success_response(order, "Order created successfully", 201);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    const validatedToken = await validateToken(token);

    const orders = await getAllOrders(
      (validatedToken?.userId as unknown) as string
    );

    return success_response(orders, "Orders fetched successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
