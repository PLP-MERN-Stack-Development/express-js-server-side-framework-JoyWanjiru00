require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productsRoutes = require('./routes/products');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);

connectDB();

app.get('/', (req, res) => res.send('Welcome to the Product API with MongoDB!'));
app.use('/api/products', productsRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = app;
