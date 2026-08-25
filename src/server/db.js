const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const uri = MONGODB_URI;

const connection = mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('MongoDB Connection Failed:', error.message);
  });

module.exports = connection;