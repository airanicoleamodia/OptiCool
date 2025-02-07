const express = require('express');
const router = express.Router();
const { sendReport, getAllReports } = require('../controllers/EReportController');  // Import the controller

router.post('/ereport', (req, res) => {
  const { user, ...reportData } = req.body;
  sendReport(user, reportData, res);
});  // Assuming the route for submitting reports is `/api/ereport`
router.get('/getreport', getAllReports);
module.exports = router;
