const express = require('express');
const cors = require('cors');
require('./db');

const userRoutes = require('../routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth routes (/register, /login)
app.use('/', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

//shorten url post

app.use("/url", userRoutes)
app.use("/:shortId", userRoutes)



// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});






module.exports = app;