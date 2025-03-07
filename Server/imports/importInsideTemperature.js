const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Connect to MongoDB
mongoose.connect("mongodb+srv://angelpagalan:angelpagalan@cluster0.w5pzofs.mongodb.net/Cool", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const TemperatureSchema = new mongoose.Schema({
  temperature: Number,
  timestamp: Date,
});

// Create model
const Temperature = mongoose.model("Temperature", TemperatureSchema);

// Read JSON file
const temperatureDataPath = path.join(__dirname, "../data/inside_temperature.json");
const temperatureData = JSON.parse(fs.readFileSync(temperatureDataPath, "utf-8"));

// Remove _id field from data
const sanitizedTemperatureData = temperatureData.map(({ _id, ...rest }) => rest);

// Insert data into MongoDB
Temperature.insertMany(sanitizedTemperatureData)
  .then(() => {
    console.log("Inside temperature data inserted successfully!");

    // Fetch the latest data from MongoDB
    return Temperature.find().sort({ timestamp: -1 }).limit(100).exec();
  })
  .then((latestTemperatureData) => {
    // Write the latest data to the JSON file
    const updatedTemperatureDataPath = path.join(__dirname, "../data/inside_temperature.json");
    fs.writeFileSync(updatedTemperatureDataPath, JSON.stringify(latestTemperatureData, null, 2));
    console.log("Inside temperature data updated in inside_temperature.json!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting inside temperature data:", err);
    mongoose.connection.close();
  });

