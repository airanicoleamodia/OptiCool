const Report = require('../models/EReport');  // Import your Report model

exports.sendReport = async (req, res, next) => {
    try {
        console.log(req.body); // Check the request body to ensure data is being passed

        const { appliance, status} = req.body;  // Destructure appliance, status, user, description, and priority from the request body

        if (!appliance || !status || !user) {
            return res.status(400).json({ message: 'Appliance, status, and user are required.' });
        }

        // Create a new report
        const newReport = await Report.create({
            appliance,
            status,
            user,
            description,
            priority,
            reportDate: new Date(),  // Optional: you can store the report's timestamp
        });

        if (!newReport) {
            return res.status(400).json({ message: 'Report could not be created.' });
        }

        return res.status(201).json({ message: 'Report successfully submitted', success: true }); // Success response
    } catch (err) {
        console.error(err);  // Log error for debugging purposes
        return res.status(400).json({
            message: 'Something went wrong while submitting the report. Please try again later.',
            success: false,
        });
    }
};

exports.getAllReports = async (req, res, next) => {
    try {
        const reports = await Report.find().populate('user', 'name email');  // Populate user details

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        return res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Something went wrong while fetching the reports. Please try again later.',
            success: false,
        });
    }
};

exports.getNumberOfReports = async (req, res) => {
    try {
        const reportCount = await Report.countDocuments();
        return res.json({
            success: true,
            count: reportCount,
        });
    } catch (err) {
        return res.status(400).json({
            message: 'Please try again later',
            success: false,
        });
    }
};
