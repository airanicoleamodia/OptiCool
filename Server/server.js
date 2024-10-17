const dotenv = require('dotenv');
const connectDatabase = require('./configs/database');
const app = require('./app');

dotenv.config({ path: './configs/.env' });

connectDatabase();
require('./configs/cloudinary');

const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log(`Server Started: http://localhost:${port}/`))