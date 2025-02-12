const express = require('express');
const { fetchWeatherData } = require('../services/weatherService');

const router = express.Router();

router.get('/current', async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
