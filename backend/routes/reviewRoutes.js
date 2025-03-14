import express from "express";
import { generateReview, getReviews, getOverallReview } from "../controllers/reviewController.js";

const router = express.Router();

// Define routes
router.post("/generate", generateReview); // Generates or updates a review for a specific customer
router.get("/", getReviews); // Fetch all reviews
router.get("/overall", getOverallReview); // Fetch overall review from all reviews

export default router;
