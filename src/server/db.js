const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const uri = MONGODB_URI || 'mongodb://127.0.0.1:27017/linksnap';

const connection = mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB Connected Successfully:', uri);
  })
  .catch((error) => {
    console.error('MongoDB Connection Failed:', error.message);
  });

module.exports = connection;