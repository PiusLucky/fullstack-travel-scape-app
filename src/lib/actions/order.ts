"use server";

import { OrderData } from "@/types";
import { connectToDatabase } from "../database/connection/mongoose";
import Order from "../database/models/orders.model";
import { handleError } from "../utils";
import { getPackageById } from "./package";
import { createTransaction } from "./transaction";
import { getUserById, updateUser } from "./user";

export async function getAllOrders(userId: string) {
  try {
    await connectToDatabase();

    const orders = await Order.find({
      userId,
    })
      .populate(["userId", "packageId"])
      .sort("-createdAt");

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order not found");

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserTotalOrderStats(userId: string) {
  try {
    await connectToDatabase();
    const orders = await Order.find({ userId }).populate({
      path: "packageId",
      select: "per_person_price_in_credit",
    });
    const ordersCount = await Order.countDocuments({ userId });

    return {
      totalCount: ordersCount,
      totalOrderAmount: orders.reduce(
        (acc, curr) => acc + curr?.packageId?.per_person_price_in_credit,
        0
      ),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function generateChart(userId: string) {
  try {
    await connectToDatabase();

    const orders = await Order.find({ userId }).populate({
      path: "packageId",
      select: "per_person_price_in_credit",
    });

    const chartData = {};

    // Initialize chartData with 0 for each month
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    months.forEach((month) => ((chartData as any)[month] = 0));

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const month = createdAt.toLocaleString("default", { month: "short" });
      const packagePrice = order.packageId.per_person_price_in_credit;

      (chartData as any)[month] += packagePrice;
    });

    return chartData;
  } catch (error) {
    handleError(error);
  }
}

export async function createOrder(orderData: OrderData) {
  try {
    await connectToDatabase();
    //NOTE: Check if user has enough credit
    const user = await getUserById(orderData.userId);
    const selectedPackage = await getPackageById(orderData.packageId);

    if (user.credit >= selectedPackage?.per_person_price_in_credit) {
      const newOrder = await Order.create({ ...orderData, status: "SUCCESS" });

      const transaction = {
        userId: user._id,
        source: "ORDER" as "ORDER",
        source_id: newOrder?._id,
        amount: selectedPackage?.per_person_price_in_credit,
        status: "SUCCESS" as "SUCCESS",
      };

      await createTransaction(transaction);

      //NOTE: Remove exact amount from use's credit
      const reconciledCredit =
        Number(user.credit) -
        Number(selectedPackage?.per_person_price_in_credit);
      await updateUser(user._id, { credit: reconciledCredit });

      return JSON.parse(JSON.stringify(newOrder));
    }
    handleError("Sorry, insufficient balance, kindly top up");
  } catch (error) {
    handleError(error);
  }
}

export async function updateOrder(orderId: string, orderData: OrderData) {
  try {
    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
      new: true,
    });

    if (!updatedOrder) throw new Error("Order update failed");

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await connectToDatabase();

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    return deletedOrder ? JSON.parse(JSON.stringify(deletedOrder)) : null;
  } catch (error) {
    handleError(error);
  }
}
