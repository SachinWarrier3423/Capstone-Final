// backend/index.js

// 1. Load environment variables
import dotenv from "dotenv";
dotenv.config();

// 2. Import dependencies
import express from "express";
import mongoose from "mongoose";

// 3. Import route modules
import authRoutes from "./routes/auth.js";
import threatRoutes from "./routes/threats.js";
import alertRoutes from "./routes/alerts.js";

// 4. Create the Express app
const app = express();

// 5. Middleware: JSON parser
app.use(express.json());

// 6. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "threatintel" // Optional but recommended
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 7. Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/threats", threatRoutes);
app.use("/api/alerts", alertRoutes);

// 8. Health check
app.get("/", (_, res) => {
  res.send("✅ Threat Intelligence API is running.");
});

// 9. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
