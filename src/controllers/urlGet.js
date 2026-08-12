const URL = require('../models/url')

const shortUrlGet = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Short URL redirect error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = shortUrlGet