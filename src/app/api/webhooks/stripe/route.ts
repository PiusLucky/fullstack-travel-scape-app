import { NextResponse } from "next/server";
import stripe from "stripe";
import { createTransaction } from "@/lib/actions/transaction";
import { updateCredits } from "@/lib/actions/user";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { metadata } = event.data.object;

    const transaction = {
      userId: metadata?.userId,
      source: "CREDIT" as "CREDIT",
      source_id: "N/A",
      amount: Number(metadata?.price) || 0,
      status: "SUCCESS" as "SUCCESS",
    };
    await updateCredits(metadata?.userId as string, Number(metadata?.price));
    const newTransaction = await createTransaction(transaction);

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
