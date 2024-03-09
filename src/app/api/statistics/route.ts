import { getUserTotalOrderStats } from "@/lib/actions/order";
import { getTotalAvailablePackages } from "@/lib/actions/package";
import { getUserTotalTransactions } from "@/lib/actions/transaction";
import { error_response, success_response, validateToken } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    const validatedToken = await validateToken(token);

    const orderStats = await getUserTotalOrderStats(
      (validatedToken?.userId as unknown) as string
    );

    const packageStats = await getTotalAvailablePackages();

    const transactionStats = await getUserTotalTransactions(
      (validatedToken?.userId as unknown) as string
    );

    const stats = {
      orders: orderStats,
      totalPackages: packageStats,
      totalTransactions: transactionStats,
    };

    return success_response(stats, "Statistics fetched successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
