const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");

// Middleware setup
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan('tiny'));

// Routes
const userRoutes = require('./routes/userRoutes');
const ereportRoutes = require('./routes/ereportRoutes');
const postRoutes = require('./routes/postRoutes'); 

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ereports', ereportRoutes);
app.use('/api/v1/posts', postRoutes); 

module.exports = app;
