const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan('tiny'));

const userRoutes = require('./routes/userRoutes');
const ereportRoutes = require('./routes/ereportRoutes');
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ereports', ereportRoutes);


module.exports = app;