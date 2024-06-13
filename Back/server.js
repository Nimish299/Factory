const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const UserRoute = require('./routes/UserRoute');
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Enable CORS with options
app.use(cors(corsOptions));

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
