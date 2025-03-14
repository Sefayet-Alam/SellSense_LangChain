import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";

// Import Routes
import chatRoutes from "./routes/chatRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON requests

// Routes
app.use("/api/chats", chatRoutes); // Chat routes for fetching and updating chats
app.use("/api/reviews", reviewRoutes); // Review routes for fetching and posting reviews

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5001; // Fallback to 5001 if process.env.PORT is not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
