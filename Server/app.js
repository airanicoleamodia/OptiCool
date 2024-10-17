const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan('tiny'));

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/users', userRoutes);

module.exports = app;