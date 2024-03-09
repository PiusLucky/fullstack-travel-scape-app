import { generateNewPackages, getAllPackages } from "@/lib/actions/package";
import { error_response, success_response, validateToken } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    await validateToken(token);

    const packages = await generateNewPackages();

    return success_response(packages, "Success", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    await validateToken(token);

    const packages = await getAllPackages();

    return success_response(packages, "Packages fetched successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
