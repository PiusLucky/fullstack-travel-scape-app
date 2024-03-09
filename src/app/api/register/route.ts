import { createUser } from "@/lib/actions/user";
import { error_response, success_response } from "@/lib/utils";
import { CreateUserInputValidation } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inputValidation = CreateUserInputValidation.safeParse(body);

    if (!inputValidation.success) {
      return error_response(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    const user = await createUser(body);

    return success_response(user, "User created successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
