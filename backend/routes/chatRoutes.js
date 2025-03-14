import express from "express";
import { sendMessage, getChatHistory, getAllCustomerIds } from "../controllers/chatController.js";

const router = express.Router();

// Get chat history for a customer
router.get("/:customerId", getChatHistory);

// Get all unique customer IDs
router.get("/", getAllCustomerIds); // Add this new route

// Send a new message
router.post("/", sendMessage);

export default router;
