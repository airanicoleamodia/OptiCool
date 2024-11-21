const express = require('express');
const router = express.Router();
const { sendReport } = require('../controllers/EReportController');  // Import the controller

router.post('/ereport', sendReport);  // Assuming the route for submitting reports is `/api/ereport`

module.exports = router;
