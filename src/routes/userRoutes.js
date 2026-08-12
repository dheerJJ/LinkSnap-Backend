const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { handlegenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const shortUrlGet = require('../controllers/urlGet');

router.post('/register', register);
router.post('/login', login);
router.post('/url', handlegenerateNewShortURL)
router.get('/:shortId', shortUrlGet)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router; 