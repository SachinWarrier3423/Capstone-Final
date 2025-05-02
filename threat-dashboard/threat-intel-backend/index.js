// backend/index.js

// 1. Load environment variables
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure the .env file is loaded from the correct directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 2. Import dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// 3. Import route modules
import authRoutes from "./routes/auth.js";
import threatRoutes from "./routes/threats.js";
import alertRoutes from "./routes/alerts.js";

// 4. Create the Express app
const app = express();

// 5. Middleware: JSON parser
app.use(express.json());

// 6. Enable CORS for all routes
app.use(cors());

// 7. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "threatintel" // Optional but recommended
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 8. Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/threats", threatRoutes);
app.use("/api/alerts", alertRoutes);

// 9. Health check
app.get("/", (_, res) => {
  res.send("✅ Threat Intelligence API is running.");
});

<<<<<<< HEAD
// 10. Start the server
const PORT = process.env.PORT || 5000;
=======
// 9. Start the server
const PORT = process.env.PORT || 8080;
>>>>>>> c5cb724ffcc3eb64e4b28bc8aca27eef988a8fed
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
