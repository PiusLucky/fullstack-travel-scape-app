import { getAllTransactions } from "@/lib/actions/transaction";
import { error_response, success_response, validateToken } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    const validatedToken = await validateToken(token);

    const transactions = await getAllTransactions(
      (validatedToken?.userId as unknown) as string
    );

    return success_response(
      transactions,
      "Transactions fetched successfully",
      200
    );
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
