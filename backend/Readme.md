
cmd commands:

mkdir backend && cd backend
npm init -y

touch server.js .env README.md
mkdir controllers models routes middleware config utils langchain public

touch controllers/chatController.js controllers/reviewController.js
touch models/Chat.js models/Review.js
touch routes/chatRoutes.js routes/reviewRoutes.js
touch middleware/authMiddleware.js middleware/errorMiddleware.js
touch config/db.js
touch utils/logger.js
touch langchain/reviewGenerator.js


installations:
npm install express mongoose cors dotenv langchain openai

npm install -g nodemon

npm install axios
npm install dotenv

npm install langchain @langchain/groq dotenv
nodemon server.js