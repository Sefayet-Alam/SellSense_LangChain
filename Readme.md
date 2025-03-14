# Full-Stack Project: SellSense

## Project Overview

This project is a full-stack application designed to facilitate communication between customers and sellers. The application enables customers to chat with sellers, view reviews based on conversations, and allows sellers to engage with customers in a one-ended chat environment. The backend leverages AI-powered language processing (LangChain) to generate conversation summaries and store them as reviews.

<img src="https://github.com/Sefayet-Alam/SellSense_LangChain/blob/master/AI.png">

## Features

### Frontend

1. **Home Page**  
   The home page will include a welcome message, a brief introduction about the project, and instructions on how users can navigate and use the website.

2. **Chat to Seller Page**  
   This page acts as a simplified messaging interface. Unlike traditional messaging platforms, this is one-ended: the user can send messages either as a customer (e.g., Customer 1, Customer 2) or as a seller.  
   - Users can select a recipient (customer or seller).
   - The chat history will be fetched dynamically from the backend, and the conversation will be updated as new messages are sent.
   - Messages are saved in the backend database and reflected in the chat UI.

3. **Review Page**  
   - This page displays reviews that summarize customer-seller conversations.  
   - Reviews are generated by LangChain, which processes chat data and generates concise summaries.  
   - Each review card will display:  
     - **From:** Customer's name (e.g., Customer 1, Customer 2)
     - **To:** Seller's name
     - **Summary:** A summary of the conversation.

### Navigation and Responsiveness

- **Navbar and Sidebar:**  
   - The website will have a navbar and sidebar containing links to all pages (Home, Chat to Seller, Review).
   - The design will be responsive, ensuring a seamless user experience across different screen sizes.

- **Footer:**  
   - The footer will display developer information, such as the developer's name and professional links.

### Backend

1. **Database & Data Handling:**
   - Conversations between customers and sellers will be stored in the database.
   - The backend will handle various API requests such as fetching conversation history, posting new messages, updating data, etc.

2. **AI Integration with LangChain:**
   - LangChain will be integrated to process chat data and generate reviews.
   - Reviews will summarize the interactions between customers and sellers and will be stored in a separate reviews table.

3. **API Endpoints:**
   - **POST /message:** Sends a message from a customer or seller.
   - **GET /chat-history:** Fetches the chat history between the selected customer and seller.
   - **POST /review:** Generates and stores a review based on the conversation.
   - **GET /reviews:** Fetches the list of reviews for display on the frontend.

### Technologies Used

- **Frontend:**
  - React.js (for building user interfaces)
  - CSS (for styling)
  - Axios (for API requests)

- **Backend:**
  - Node.js with Express.js (for handling HTTP requests)
  - MongoDB (for database storage)
  - LangChain (for generating conversation summaries)
  
- **Deployment:**
  - Deployed on a cloud platform (e.g., AWS, Heroku, or DigitalOcean)

## Installation Instructions

### Prerequisites

1. Install [Node.js](https://nodejs.org/) for backend and frontend development.
2. Install [MongoDB](https://www.mongodb.com/) for the database.
3. Install [LangChain](https://langchain.readthedocs.io/) for AI-powered review generation.

    
