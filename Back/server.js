const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');

const app = express();

const UserRoute = require('./routes/UserRoute');

// CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' })); // Set JSON payload limit to 50 MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Set URL-encoded payload limit to 50 MB
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.use('/api/user', UserRoute);

// Database connection and server start
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server started on port', process.env.PORT);
      console.log('Connected to database');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
