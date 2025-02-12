const express = require('express');
const { fetchWeatherData } = require('../services/weatherService');

const router = express.Router();

router.get('/current', async (req, res) => {
    try {
        console.log("Weather route hit");
        const weatherData = await fetchWeatherData();
        console.log("Weather data fetched:", weatherData);
        res.json(weatherData);
    } catch (error) {
        console.error("Error in weather route:", error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
