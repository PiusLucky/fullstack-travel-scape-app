import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface IValidatedToken {
  userId: number;
  iat: number;
  exp: number;
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    throw new Error(error);
  } else {
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const success_response = (
  data: any,
  message: string = "Success",
  code = 200
) => {
  const response = {
    meta: {
      success: true,
      message,
    },
    data,
  };
  return NextResponse.json({ response }, { status: code });
};

export const error_response = (
  message: string = "Error",
  code = 400,
  data: any = null
) => {
  const response = {
    meta: {
      success: false,
      message,
    },
    data,
  };
  return NextResponse.json({ response }, { status: code });
};

export const validateToken = async (
  token: string | null
): Promise<IValidatedToken | void | null> => {
  if (!token) {
    throw new Error("Invalid Token");
  }
  try {
    const decodedToken: IValidatedToken | void = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET as string,
      function(err, payload) {
        //@ts-ignore
        if (err) {
          throw new Error(err?.message);
        } else {
          return payload;
        }
      }
    );

    return decodedToken;
  } catch (err) {
    throw new Error((err as any)?.message);
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ellipsify(str: string, length: number = 15): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
