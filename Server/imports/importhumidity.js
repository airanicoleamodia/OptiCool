const mongoose = require("mongoose");
const fs = require("fs");

// Connect to MongoDB
mongoose.connect("mongodb+srv://angelpagalan:angelpagalan@cluster0.w5pzofs.mongodb.net/Cool", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const HumiditySchema = new mongoose.Schema({
  humidity: Number,
  timestamp: Date,
});

// Create model
const Humidity = mongoose.model("Humidity", HumiditySchema);

// Read JSON file
// const data = JSON.parse(fs.readFileSync("C:/Users/Win10/Thesis/1/OptiCool/Server/humidity.json", "utf-8"));
const data = JSON.parse("C:\\Users\\arman\\Capstone\\OptiCool\\Server\\data\\humidity.json", "utf-8");

// Remove _id field from data
const sanitizedData = data.map(({ _id, ...rest }) => rest);

// Insert data into MongoDB
Humidity.insertMany(sanitizedData)
  .then(() => {
    console.log("Humidity data inserted successfully!");

    // Fetch the latest data from MongoDB
    return Humidity.find().sort({ timestamp: -1 }).limit(100).exec();
  })
  .then((latestData) => {
    // Write the latest data to the JSON file
    fs.writeFileSync("C:/Users/Win10/Thesis/1/OptiCool/Server/humidity.json", JSON.stringify(latestData, null, 2));
    console.log("Humidity data updated in humidity.json!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting humidity data:", err);
    mongoose.connection.close();
  });

