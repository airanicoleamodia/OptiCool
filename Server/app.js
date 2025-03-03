const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const fs = require('fs');

// Middleware setup
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: '50mb' })); // Adjust size as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('tiny'));

// Routes
const userRoutes = require('./routes/userRoutes');
const ereportRoutes = require('./routes/ereportRoutes');
const postRoutes = require('./routes/postRoutes');
const powerConsumptionRoutes = require('./routes/powerConsumptionRoutes'); // Import power consumption routes

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ereports', ereportRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/power-consumption', powerConsumptionRoutes); // Use power consumption routes

app.post('/api/v1/save/data', async (req, res) => {

    const jsonData = JSON.stringify(req.body.power, null, 2);

    // Write to a file
    fs.writeFileSync('power_consumption.json', jsonData, 'utf8');

    res.json({
        message: "write success",
    })
})

module.exports = app;
