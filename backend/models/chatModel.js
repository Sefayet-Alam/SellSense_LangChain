import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: [true, "Customer ID is required"], // Added validation message
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["customer", "seller"],
          required: [true, "Sender is required"], // Added validation message
        },
        text: {
          type: String,
          required: [true, "Message text is required"], // Added validation message
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
