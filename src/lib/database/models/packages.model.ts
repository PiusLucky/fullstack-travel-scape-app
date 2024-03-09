import { Schema, model, models, Types } from "mongoose";

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    per_person_price_in_credit: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    total_days: {
      type: Number,
      required: true,
    },
    total_people_allowed: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    average_rating: {
      type: Number,
      default: 0,
    },
    total_rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // This will add the createdAt and updatedAt fields
);

const Package = models?.Package || model("Package", PackageSchema);

export default Package;
