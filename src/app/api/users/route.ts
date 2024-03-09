import { getUserById } from "@/lib/actions/user";
import { error_response, success_response, validateToken } from "@/lib/utils";

export async function GET(req: Request) {
    try {
      const token = req.headers.get("Authorization");
  
      const validatedToken = await validateToken(token);
  
      const orders = await getUserById(
        (validatedToken?.userId as unknown) as string
      );
  
      return success_response(orders, "User fetched successfully", 200);
    } catch (err) {
      return error_response((err as any)?.message, 400);
    }
  }
  