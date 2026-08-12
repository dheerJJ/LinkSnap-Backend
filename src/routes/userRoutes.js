const express = require('express');
const router = express.Router();
const { register, login, deleteAccount } = require('../controllers/authController');
const { handlegenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const shortUrlGet = require('../controllers/urlGet');
const auth = require('../middleware/auth');
const { handleGenerateQR } = require('../controllers/qrController');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete-account', auth, deleteAccount);
router.post('/url', handlegenerateNewShortURL);
router.get('/qr/:shortId', handleGenerateQR);
router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/:shortId', shortUrlGet);


module.exports = router; 