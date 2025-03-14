import Review from "../models/reviewModel.js";
import Chat from "../models/chatModel.js";
import { generateSummary } from "../utils/reviewGeneration.js";
import { generateOverallReview } from "../utils/overallReviewGeneration.js";

// Generate Overall Review for all reviews in DB
export const getOverallReview = async (req, res) => {
  try {
    const overallReview = await generateOverallReview();
    
    if (!overallReview) {
      return res.status(500).json({ error: "Failed to generate overall review." });
    }

    res.status(200).json({ overallReview });
  } catch (error) {
    console.error("Error fetching overall review:", error);
    res.status(500).json({ error: "Error fetching overall review." });
  }
};
// Generate or update a review for a given customer_id
export const generateReview = async (req, res) => {
  try {
    const { customer_id } = req.body;

    // Ensure customer_id is provided
    if (!customer_id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Find chat messages for the given customer_id
    const chat = await Chat.findOne({ customerId: customer_id });

    if (!chat || !chat.messages.length) {
      return res.status(404).json({ error: "No chat history found for this customer" });
    }

    // Prepare messages in the required format for Groq API (array of message objects)
    const conversation = chat.messages.map((message) => ({
      role: message.sender === "seller" ? "seller" : "customer", // Adjust based on your sender roles
      content: message.text,
    }));

    // Generate AI-based review
    const reviewText = await generateSummary(conversation); // Pass the array to generateSummary

    // Check if reviewText was generated successfully
    if (!reviewText) {
      return res.status(500).json({ error: "Failed to generate review" });
    }

    // Upsert: If review exists, update it; otherwise, create a new one
    const updatedReview = await Review.findOneAndUpdate(
      { customer_id }, // Search for review by customer_id
      { summary: reviewText }, // Update summary
      { upsert: true, new: true } // Create a new review if not found
    );

    // Send successful response
    res.status(200).json({ message: "Review generated successfully", review: updatedReview });
  } catch (error) {
    console.error("Error generating review:", error);
    res.status(500).json({ error: "Error generating review" });
  }
};
// Get all reviews but return only customer_id and their respective summaries
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}, { customer_id: 1, summary: 1, _id: 0 });
    res.status(200).json(reviews);
  } catch (error) {
    // console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
