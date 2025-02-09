const express = require('express');
const router = express.Router();
const { sendReport, getAllReports, getNumberOfReports } = require('../controllers/EReportController');  // Import the controller

router.post('/ereport', sendReport);  // Route for submitting reports
router.get('/getreport', getAllReports);  // Route for getting all reports
router.get('/reportcount', getNumberOfReports);  // Route for getting the number of reports

module.exports = router;