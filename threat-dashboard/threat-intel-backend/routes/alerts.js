import express from "express";
import { Alert } from "../models/Alert.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ date: -1 }).limit(100);
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
