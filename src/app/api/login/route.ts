import { loginUser } from "@/lib/actions/user";
import { error_response, success_response } from "@/lib/utils";
import { LoginUserInputValidation } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const inputValidation = LoginUserInputValidation.safeParse(body);

    if (!inputValidation.success) {
      return error_response(
        "Input validation failed",
        400,
        inputValidation.error
      );
    }

    const user = await loginUser(email, password);

    return success_response(user, "User login successfully", 200);
  } catch (err) {
    return error_response((err as any)?.message, 400);
  }
}
