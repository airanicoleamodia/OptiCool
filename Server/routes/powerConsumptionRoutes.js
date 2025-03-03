const express = require("express");
const router = express.Router();
const powerConsumptionController = require("../controllers/powerConsumptionController");

// Route to fetch all power consumption data
router.get("/", powerConsumptionController.getAllPowerConsumptions);

// Route to fetch power consumption by date range
router.get("/range", powerConsumptionController.getPowerConsumptionByDate);

module.exports = router;
