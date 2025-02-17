const Report = require('../models/EReport');  // Import your Report model
const User = require('../models/User');  // Import your User model
const moment = require('moment-timezone');  // Import moment-timezone

exports.sendReport = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body); // Log the request body to ensure data is being passed

        const { appliance, status, user } = req.body;  // Destructure appliance, status, and user from the request body

        if (!appliance || !status || !user) {
            console.log("Missing required fields:", { appliance, status, user }); // Log missing fields
            return res.status(400).json({ message: 'Appliance, status, and user are required.' });
        }

        const userData = await User.findById(user);
        if (!userData) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const timeReported = moment().tz("Asia/Manila").format("hh:mm:ss A");  // Set the timeReported field with Manila time in AM/PM format

        console.log("Time Reported:", timeReported); // Log the timeReported value

        // Create a new report
        const newReport = await Report.create({
            appliance,
            status,
            reportDate: new Date(),  // Optional: you can store the report's timestamp
            timeReported,
            user,  // Store only user ID
        });

        console.log("New Report Created:", newReport); // Log the new report

        if (!newReport) {
            return res.status(400).json({ message: 'Report could not be created.' });
        }

        return res.status(201).json({ message: 'Report successfully submitted', success: true }); // Success response
    } catch (err) {
        console.error("Error submitting report:", err.message);  // Log error for debugging purposes
        return res.status(400).json({
            message: 'Something went wrong while submitting the report. Please try again later.',
            success: false,
        });
    }
};

exports.getAllReports = async (req, res, next) => {
    try {
        const reports = await Report.find().populate('user', 'username email');  // Fetch all reports and populate user field

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        console.log("Fetched Reports:", reports); // Log the fetched reports

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