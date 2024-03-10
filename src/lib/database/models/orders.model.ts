import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: "userId is required",
      ref: "User",
    },
    packageId: {
      type: Schema.Types.ObjectId,
      required: "packageId is required",
      ref: "Package",
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAIL"],
      required: "status is required",
    },
    rate: {
      type: String,
      enum: [1, 2, 3, 4, 5, 6],
    },
  },
  { timestamps: true } // This will add the createdAt and updatedAt fields
);

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
