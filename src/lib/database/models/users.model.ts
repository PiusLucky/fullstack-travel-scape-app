import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    credit: {
      type: Number,
      default: 100, // User is given 100 credits on signup
    },
    password: {
      type: String,
      required: true,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // This will add the createdAt and updatedAt fields
);

const User = models?.User || model("User", UserSchema);

export default User;
