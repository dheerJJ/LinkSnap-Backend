const URL = require('../models/url')
const shortId = require('shortid')

async function handlegenerateNewShortURL(req, res) {

    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "url is required" })

    let shortID = body.customAlias || body.id;
    if (shortID) {
        shortID = shortID.trim();
        const existing = await URL.findOne({ shortId: shortID });
        if (existing) {
            return res.status(400).json({ error: "Custom alias is already taken" });
        }
    } else {
        shortID = shortId();
    }

    let targetUrl = body.url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = `https://${targetUrl}`;
    }

    await URL.create({
        shortId: shortID,
        redirectURL: targetUrl,
        visitHistory: [],
    })

    return res.json({ id: shortID })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}



module.exports = {
    handlegenerateNewShortURL,
    handleGetAnalytics
}