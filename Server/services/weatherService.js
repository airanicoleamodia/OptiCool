const axios = require('axios');

const AccuweatherbaseURL = "https://dataservice.accuweather.com";
const apiKey = process.env.ACCUWEATHER_API_KEY;
const locationKey = process.env.LOCATION_KEY;

const fetchWeatherData = async () => {
    try {
        console.log("AccuWeather API Key:", apiKey);
        console.log("Location Key:", locationKey);

        const { data } = await axios.get(
            `${AccuweatherbaseURL}/currentconditions/v1/${locationKey}`,
            {
                params: {
                    apikey: apiKey,
                    language: "en-us",
                    details: true,
                },
            }
        );

        console.log("AccuWeather API Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        throw error;
    }
};

module.exports = {
    fetchWeatherData,
};
