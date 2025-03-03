const mongoose = require("mongoose");
const fs = require("fs");

// Connect to MongoDB
mongoose.connect("mongodb+srv://angelpagalan:angelpagalan@cluster0.w5pzofs.mongodb.net/Cool", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const PowerConsumptionSchema = new mongoose.Schema({
  consumption: Number,
  timestamp: Date,
});

// Create model
const PowerConsumption = mongoose.model("PowerConsumption", PowerConsumptionSchema);

// Read JSON file
const data = JSON.parse(fs.readFileSync("C:\\Users\\arman\\Capstone\\OptiCool\\Server\\power_consumption.json", "utf-8"));

// Insert data into MongoDB
PowerConsumption.insertMany(data)
  .then(() => {
    console.log("Data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error inserting data:", err));
