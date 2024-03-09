import { generateChart } from "@/lib/actions/order";
import { error_response, success_response, validateToken } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    const validatedToken = await validateToken(token);

    const chart = await generateChart(
      (validatedToken?.userId as unknown) as string
    );

    return success_response(chart, "Chart fetched successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
