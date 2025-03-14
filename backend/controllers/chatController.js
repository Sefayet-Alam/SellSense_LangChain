import Chat from "../models/chatModel.js";

// Send a message (updates existing conversation or creates a new one)
export const sendMessage = async (req, res) => {
  try {
    const { customerId, sender, text } = req.body;

    // Validate required fields
    if (!customerId || !sender || !text) {
      return res.status(400).json({ error: "All fields (customerId, sender, text) are required." });
    }

    // Log incoming request data for debugging
    // console.log("Request Data:", req.body);

    const chat = await Chat.findOneAndUpdate(
      { customerId },
      {
        $push: { messages: { sender, text, timestamp: new Date() } },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(chat);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
};

// Get chat history for a specific customer
export const getChatHistory = async (req, res) => {
  try {
    const { customerId } = req.params;
    const chat = await Chat.findOne({ customerId });

    if (!chat) {
      return res.status(404).json({ message: "No chat history found" });
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history", details: error.message });
  }
};


// Get all unique customer IDs
export const getAllCustomerIds = async (req, res) => {
  try {
    const customerIds = await Chat.distinct("customerId"); // Fetch unique customer IDs

    if (!customerIds.length) {
      return res.status(404).json({ message: "No customer IDs found" });
    }

    res.status(200).json({ customerIds });
  } catch (error) {
    console.error("Error fetching customer IDs:", error);
    res.status(500).json({ error: "Failed to fetch customer IDs", details: error.message });
  }
};