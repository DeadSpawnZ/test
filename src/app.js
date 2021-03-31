const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/auth');
const app = express();
require('dotenv').config();
require('./database/connection');

//Settings
app.set('appName', 'Test Api');
app.set('port', process.env.PORT);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/user', require('./routes/user.route'));
app.use('/product', require('./routes/product.route'));
app.use(errorHandler);

module.exports = app;