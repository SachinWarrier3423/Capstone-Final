import express from 'express';
import axios from 'axios';
import { Threat } from '../models/Threat.js';
import { Alert } from '../models/Alert.js';
import { authenticateJWT } from '../middleware/auth.js';

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
    if (r.data) {
      await saveThreat(req.params.ip, "VirusTotal", r.data, res);
    } else {
      res.status(404).send("No data found from VirusTotal");
    }
  } catch (error) {
    console.error("VirusTotal API error:", error.message);
    res.status(500).send("VirusTotal failed");
  }
});

router.get("/otx/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(
      `https://otx.alienvault.com/api/v1/indicators/IPv4/${req.params.ip}/general`,
      { headers: { "X-OTX-API-KEY": process.env.OTX_API_KEY } }
    );
    if (r.data) {
      await saveThreat(req.params.ip, "OTX", r.data, res);
    } else {
      res.status(404).send("No data found from OTX");
    }
  } catch (error) {
    console.error("OTX API error:", error.message);
    res.status(500).send("OTX failed");
  }
});

router.get("/shodan/:ip", authenticateJWT, async (req, res) => {
  try {
    const r = await axios.get(
      `https://api.shodan.io/shodan/host/${req.params.ip}?key=${process.env.SHODAN_API_KEY}`
    );
    if (r.data) {
      await saveThreat(req.params.ip, "Shodan", r.data, res);
    } else {
      res.status(404).send("No data found from Shodan");
    }
  } catch (error) {
    console.error("Shodan API error:", error.message);
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
    if (r.data) {
      await saveThreat(req.params.ip, "AbuseIPDB", r.data, res);
    } else {
      res.status(404).send("No data found from AbuseIPDB");
    }
  } catch (error) {
    console.error("AbuseIPDB API error:", error.message);
    res.status(500).send("AbuseIPDB failed");
  }
});

router.get("/reports", authenticateJWT, async (req, res) => {
  try {
    const reports = await Threat.find({});
    if (reports.length > 0) {
      res.json(reports);
    } else {
      res.status(404).send("No reports found");
    }
  } catch (err) {
    console.error("Error fetching reports:", err.message);
    res.status(500).send("Failed to fetch reports");
  }
});

// Temporarily disable authentication for testing
router.get("/", async (req, res) => {
  try {
    const threats = await Threat.find();
    if (threats.length > 0) {
      res.json(threats);
    } else {
      res.status(404).send("No threats found");
    }
  } catch (err) {
    console.error("Error fetching threats:", err.message);
    res.status(500).send("Failed to fetch threats");
  }
});

export default router;
