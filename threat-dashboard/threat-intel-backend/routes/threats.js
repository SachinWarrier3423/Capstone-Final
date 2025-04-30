const express = require("express");
const axios = require("axios");
const Threat = require("../models/Threat");
const Alert = require("../models/Alert");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();

const saveThreat = async (ip, source, data, res) => {
  await Threat.create({ ip, source, data });
  if (source === "VirusTotal" && data?.data?.attributes?.last_analysis_stats?.malicious > 0) {
    await Alert.create({ relatedIP: ip, level: "High", message: `${ip} flagged by VirusTotal` });
  }
  res.json(data);
};

router.get("/vt/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(`https://www.virustotal.com/api/v3/ip_addresses/${req.params.ip}`, {
      headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
    });
    await saveThreat(req.params.ip, "VirusTotal", r.data, res);
  } catch {
    res.status(500).send("VirusTotal failed");
  }
});

router.get("/otx/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(
      `https://otx.alienvault.com/api/v1/indicators/IPv4/${req.params.ip}/general`,
      { headers: { "X-OTX-API-KEY": process.env.OTX_API_KEY } }
    );
    await saveThreat(req.params.ip, "OTX", r.data, res);
  } catch {
    res.status(500).send("OTX failed");
  }
});

router.get("/shodan/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(
      `https://api.shodan.io/shodan/host/${req.params.ip}?key=${process.env.SHODAN_API_KEY}`
    );
    await saveThreat(req.params.ip, "Shodan", r.data, res);
  } catch {
    res.status(500).send("Shodan failed");
  }
});

router.get("/abuse/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${req.params.ip}&maxAgeInDays=90`,
      {
        headers: {
          Key: process.env.ABUSEIPDB_KEY,
          Accept: "application/json",
        },
      }
    );
    await saveThreat(req.params.ip, "AbuseIPDB", r.data, res);
  } catch {
    res.status(500).send("AbuseIPDB failed");
  }
});

module.exports = router;
