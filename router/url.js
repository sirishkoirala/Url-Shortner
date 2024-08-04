const express = require('express')
const { handleGenerateNewShortURL, handleShortURL, handleAnalytics, handleAllUrls, handleWebPage, handleDeleteShortId } = require("./../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/id/:shortId", handleShortURL)

router.get('/', handleAllUrls)

router.get("/test", handleWebPage)

router.get("/analytics/:shortId", handleAnalytics)


router.delete("/id/:shortId", handleDeleteShortId)

module.exports = router;