import axios from "axios";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers"; // Fix: Use StringOutputParser
import Chat from "../models/chatModel.js";
import Review from "../models/reviewModel.js";

// Load environment variables (e.g., API key)
dotenv.config();

// Function to generate a structured review
export const generateSummary = async (conversation) => {
  try {
    // console.log("Generating summary for conversation:", conversation);

    // Initialize LangChain's Groq Chat model
    const chat = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "mixtral-8x7b-32768",
    });

    // Define system and human messages in prompt template
    const systemMessage = "You are an AI assistant trained to review customer conversations.";
    const humanMessage = `
      Here is a customer conversation:
      {text}
      
      Generate key points based on (each point should be in new line and bold font):
      - for each product:
      Product Name: (say "not mentioned" if not mentioned explicitly
      Status: Did the customer buy the product? (YES/NO)
      Review: If yes, then overall product review summary (if provided).
      Reason of not buying: If no, give the reason the customer didn't buy.
      If they are undecided, state that they need time and why.
      Product delievered:  If the customer bought the product, mention the delivery date and if delivered then give emoji right sign.
      Overall conversation Summary over all products: The summary should be concise and to the point.
      Example:  (every attribute must be in new line)
      Product Name: iPhone 13 
      Status: YES
      Review: Great phone, love the camera.
      Product delivered: 🚚
      Product Name: Samsung Galaxy S21
      Status: NO
      Reason of not buying: Too expensive.
      Overall conversation Summary over all products: Customer is happy with the iPhone 13 but found the Samsung Galaxy S21 too expensive. (if there are multiple products)
    `;

    // Create a ChatPromptTemplate
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemMessage],
      ["human", humanMessage],
    ]);

    // Create the LangChain pipeline
    const chain = prompt.pipe(chat).pipe(new StringOutputParser()); // Fix: Use StringOutputParser
    // console.log(conversation)
    // Invoke LangChain pipeline with conversation
    const response = await chain.invoke({ text: conversation });

    // console.log("LangChain AI response:", response);

    return response;
  } catch (error) {
    // console.error("Error in AI request:", error.message);
    throw new Error("Error generating review.");
  }
};
