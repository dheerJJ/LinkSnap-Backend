const URL = require('../models/url')

const shortUrlGet = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL)
}

module.exports = shortUrlGet