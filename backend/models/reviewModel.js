import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customer_id: { type: String, required: true, unique: true }, // Ensure uniqueness
    summary: { type: String, required: true }, // AI-generated summary
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
