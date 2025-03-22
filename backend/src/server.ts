import express from "express"; 
import dotenv from "dotenv"; // read secrets and environment variables from the .env file
import mongoose from "mongoose"; // a third-party library for MongoDB,
import cors from "cors";

import helloRouter from "./routes/helloRouter";
import pdfRouter from "./routes/pdfRouter";

dotenv.config(); // Load .env file with mongodb secret

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // Allows the frontend to send requests with the Content-Type header. Added for application/pdf files
    // see https://www.geeksforgeeks.org/express-js-express-urlencoded-function/ for more information
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); //parse URL-encoded form data

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
app.use("/api", helloRouter);
app.use("/api", pdfRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
