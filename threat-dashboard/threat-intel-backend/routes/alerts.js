const express = require("express");
const Alert = require("../models/Alert");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  const alerts = await Alert.find().sort({ date: -1 }).limit(100);
  res.json(alerts);
});

module.exports = router;
