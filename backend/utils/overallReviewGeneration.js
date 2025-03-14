import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers"; 
import Review from "../models/reviewModel.js";

dotenv.config();

// Function to generate an overall review
export const generateOverallReview = async () => {
  try {
    // console.log("Generating overall review...");

    // Fetch all reviews from the database
    const reviews = await Review.find({}, { summary: 1, _id: 0 });

    if (!reviews.length) {
      throw new Error("No reviews found in the database.");
    }

    // Convert reviews to text format
    const reviewTexts = reviews.map((review) => review.summary).join("\n\n");

    // Initialize LangChain's Groq Chat model
    const chat = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "mixtral-8x7b-32768",
    });

    // Define system and human messages in prompt template
    const systemMessage = "You are an AI trained to generate an overall short review based on customer reviews.";
    const humanMessage = `
      Here are multiple customer reviews:
      {reviews}
      
      Generate a short **overall review** summarizing key points (each in one line) such as:
      - Common customer feedback: (positive and negative trends)
      - Most liked or disliked features:
      - Any issues frequently mentioned:
      - Any appreciation about customer service or delivery:
      - Overall satisfaction level: (rate from 1 to 10 based on the conversation)
      The summary should be clear, concise, and useful for sellers to improve their services.
      Example:
      Common customer feedback: Great customer service, but slow delivery.
      Most liked or disliked features: Customers love the new design.
      Any issues frequently mentioned: Many customers complained about the high price.
      Any appreciation about customer service or delivery: Customers appreciate the fast delivery.
      Overall satisfaction level: 8
    `;

    // Create a ChatPromptTemplate
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemMessage],
      ["human", humanMessage],
    ]);

    // Create the LangChain pipeline
    const chain = prompt.pipe(chat).pipe(new StringOutputParser());

    // Invoke LangChain pipeline with review texts
    const overallReview = await chain.invoke({ reviews: reviewTexts });

    return overallReview;
  } catch (error) {
    console.error("Error generating overall review:", error.message);
    throw new Error("Error generating overall review.");
  }
};
