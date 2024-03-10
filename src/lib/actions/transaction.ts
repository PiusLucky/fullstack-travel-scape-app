"use server";

import { connectToDatabase } from "../database/connection/mongoose";
import { handleError } from "../utils";
import Transaction from "../database/models/transaction.model";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import {
  CheckoutTransactionParams,
  CreateTransactionData,
  UpdateTransactionData,
} from "@/types";

export async function createTransaction(
  transactionData: CreateTransactionData
) {
  try {
    await connectToDatabase();

    const newTransaction = await Transaction.create(transactionData);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllTransactions(userId: string) {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find({ userId }).sort("-createdAt");;

    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    handleError(error);
  }
}

export async function getTransactionById(transactionId: string) {
  try {
    await connectToDatabase();

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) throw new Error("Transaction not found");

    return JSON.parse(JSON.stringify(transaction));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserTotalTransactions(userId: string) {
  try {
    await connectToDatabase();

    const transactionCount = await Transaction.countDocuments({ userId });
    return transactionCount;
  } catch (error) {
    handleError(error);
  }
}

export async function updateTransaction(
  transactionId: string,
  transactionData: UpdateTransactionData
) {
  try {
    await connectToDatabase();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      transactionData,
      { new: true }
    );

    if (!updatedTransaction) throw new Error("Transaction update failed");

    return JSON.parse(JSON.stringify(updatedTransaction));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    await connectToDatabase();

    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    return deletedTransaction
      ? JSON.parse(JSON.stringify(deletedTransaction))
      : null;
  } catch (error) {
    handleError(error);
  }
}

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: "TOP_UP",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: "TOP_UP",
      credits: amount,
      price: transaction.amount,
      userId: transaction.userId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
  });

  redirect(session.url!);
}
