const QRCode = require('qrcode');
const URL = require('../models/url');

const handleGenerateQR = async (req, res) => {
    try {
        const { shortId } = req.params;

        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        const shortUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/${shortId}`;

        const qrBuffer = await QRCode.toBuffer(shortUrl, {
            type: 'png',
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
            errorCorrectionLevel: 'H',
        });

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `inline; filename="qr-${shortId}.png"`);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.send(qrBuffer);

    } catch (error) {
        console.error('QR generation error:', error);
        return res.status(500).json({ error: 'Failed to generate QR code' });
    }
};

module.exports = { handleGenerateQR };
